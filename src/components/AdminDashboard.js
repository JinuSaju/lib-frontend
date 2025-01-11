import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    isbn: '',
    publicationYear: '',
    genre: '',
    rentalStatus: 'Available',
    coverImage: null
  });

  // Styling Objects
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f4f4f4',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    header: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '30px'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginTop: '20px'
    },
    tableHeader: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '12px',
      textAlign: 'left'
    },
    tableRow: {
      borderBottom: '1px solid #ddd'
    },
    tableCell: {
      padding: '12px',
      textAlign: 'left'
    },
    addButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      margin: '20px 0',
      transition: 'background-color 0.3s ease'
    },
    deleteButton: {
      backgroundColor: '#f44336',
      color: 'white',
      border: 'none',
      padding: '6px 12px',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    form: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      margin: '20px 0'
    },
    formInput: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ddd'
    },
    formSubmitButton: {
      gridColumn: '1 / -1',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      padding: '12px',
      borderRadius: '5px',
      cursor: 'pointer'
    },
    coverImagePreview: {
      maxWidth: '200px',
      maxHeight: '200px',
      objectFit: 'cover',
      borderRadius: '8px',
      marginTop: '10px'
    }
  };

  // Fetch books on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://lib-backend-8o2x.onrender.com/api/books');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
        alert('Failed to fetch books');
      }
    };

    fetchBooks();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'coverImage' && files) {
      // Handle file input
      setNewBook(prevBook => ({
        ...prevBook,
        coverImage: files[0], // Store the file object
        coverImagePreview: URL.createObjectURL(files[0]) // Create preview URL
      }));
    } else {
      // Handle text inputs
      setNewBook(prevBook => ({
        ...prevBook,
        [name]: value
      }));
    }
  };

  // Submit new book
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('title', newBook.title);
    formData.append('author', newBook.author);
    formData.append('isbn', newBook.isbn);
    
    // Only append these if they have values
    if (newBook.publicationYear) {
      formData.append('publicationYear', newBook.publicationYear);
    }
    if (newBook.genre) {
      formData.append('genre', newBook.genre);
    }
    formData.append('rentalStatus', newBook.rentalStatus);
    
    // Append cover image if selected
    if (newBook.coverImage) {
      formData.append('coverImage', newBook.coverImage);
    }

    try {
      const response = await fetch('https://lib-backend-8o2x.onrender.com/api/books', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const addedBook = await response.json();
        setBooks(prevBooks => [...prevBooks, addedBook]);

        // Reset form
        setNewBook({
          title: '',
          author: '',
          isbn: '',
          publicationYear: '',
          genre: '',
          rentalStatus: 'Available',
          coverImage: null,
          coverImagePreview: null
        });
        setShowAddForm(false);
        alert('Book added successfully!');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to add book');
      }
    } catch (error) {
      console.error('Error adding book:', error);
      alert('An error occurred while adding the book');
    }
  };

  // Delete book
  const handleDelete = async (isbn) => {
    try {
      const response = await fetch(`https://lib-backend-8o2x.onrender.com/api/books/${isbn}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Remove book from local state
        setBooks(prevBooks => prevBooks.filter(book => book.isbn !== isbn));
        
        alert('Book deleted successfully');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('An error occurred while deleting the book');
    }
  };

  const handleViewUsers = () => {
    navigate('/admin/users');
  };

  return (

    <div>
    <NavbarAdmin />

    <div style={styles.container}>
      <h1 style={styles.header}>Library Management System - Admin Dashboard</h1>


      {/* Add Book Button */}
      <div style={{ textAlign: 'center' }}>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          style={styles.addButton}
        >
          {showAddForm ? 'Cancel' : 'Add New Book'}
        </button>
      </div>

      {/* Add Book Form */}
      {showAddForm && (
        <form onSubmit={handleFormSubmit} style={styles.form}>
          <input
            type="text"
            name="title"
            value={newBook.title}
            onChange={handleInputChange}
            placeholder="Book Title"
            style={styles.formInput}
            required
          />
          <input
            type="text"
            name="author"
            value={newBook.author} onChange={handleInputChange}
            placeholder="Author"
            style={styles.formInput}
            required
          />
          <input
            type="text"
            name="isbn"
            value={newBook.isbn}
            onChange={handleInputChange}
            placeholder="ISBN"
            style={styles.formInput}
            required
          />
          <input
            type="number"
            name="publicationYear"
            value={newBook.publicationYear}
            onChange={handleInputChange}
            placeholder="Publication Year"
            style={styles.formInput}
            min="1800"
            max={new Date().getFullYear()}
          />
          <select
            name="genre"
            value={newBook.genre}
            onChange={handleInputChange}
            style={styles.formInput}
          >
            <option value="">Select Genre</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Biography">Biography</option>
            <option value="Technology">Technology</option>
            <option value="Philosophy">Philosophy</option>
          </select>
          <select
            name="rentalStatus"
            value={newBook.rentalStatus}
            onChange={handleInputChange}
            style={styles.formInput}
          >
            <option value="Available">Available</option>
            <option value="Rented">Rented</option>
          </select>
          
          <div style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="coverImage">Book Cover Image</label>
            <input
              type="file"
              id="coverImage"
              name="coverImage"
              onChange={handleInputChange}
              accept="image/*"
              style={styles.formInput}
              required
            />
            {newBook.coverImagePreview && (
              <img
                src={newBook.coverImagePreview}
                alt="Cover Preview"
                style={styles.coverImagePreview}
              />
            )}
          </div>
          
          <button 
            type="submit"
            style={styles.formSubmitButton}
          >
            Add Book
          </button>
        </form>
      )}

      {/* Books Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Title</th>
            <th style={styles.tableHeader}>Author</th>
            <th style={styles.tableHeader}>ISBN</th>
            <th style={styles.tableHeader}>Publication Year</th>
            <th style={styles.tableHeader}>Genre</th>
            <th style={styles.tableHeader}>Rental Status</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.isbn} style={styles.tableRow}>
              <td style={styles.tableCell}>{book.title}</td>
              <td style={styles.tableCell}>{book.author}</td>
              <td style={styles.tableCell}>{book.isbn}</td>
              <td style={styles.tableCell}>{book.publicationYear}</td>
              <td style={styles.tableCell}>{book.genre}</td>
              <td style={styles.tableCell}>{book.rentalStatus}</td>
              <td style={styles.tableCell}>
                <button 
                  onClick={() => handleDelete(book.isbn)} 
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Users Button */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button 
          onClick={handleViewUsers}
          style={styles.addButton}
        >
          View Users
        </button>
      </div>
    </div>
    </div>
  );
};

export default AdminDashboard;