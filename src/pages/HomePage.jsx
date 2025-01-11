/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://lib-backend-8o2x.onrender.com/api/books');
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const closeBookDetails = () => {
    setSelectedBook(null);
  };

  if (loading) {
    return <div className="loading">Loading books...</div>;
  }

  /*return (
    <div className="home-container">
      <h1>Our Book Collection</h1>
      
      {selectedBook && (
        <div className="book-details-modal">
          <div className="book-details-content">
            <button 
              className="close-book-details-btn" 
              onClick={closeBookDetails}
            >
              &times;
            </button>
            <div className="book-details-inner">
              <h2>{selectedBook.title}</h2>
              <div className="book-details-grid">
                <div className="book-detail-item">
                  <strong>Author:</strong> {selectedBook.author}
                </div>
                <div className="book-detail-item">
                  <strong>ISBN:</strong> {selectedBook.isbn}
                </div>
                <div className="book-detail-item">
                  <strong>Publication Year:</strong> {selectedBook.publicationYear}
                </div>
                <div className="book-detail-item">
                  <strong>Genre:</strong> {selectedBook.genre}
                </div>
                <div className="book-detail-item">
                  <strong>Rental Status:</strong> {selectedBook.rentalStatus}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="book-cards">
        {books.length === 0 ? (
          <p>No books available</p>
        ) : (
          books.map((book) => (
            <div 
              key={book.isbn} 
              className="book-card"
              onClick={() => handleBookClick(book)}
            >
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre}</p>
              <p>Status: {book.rentalStatus}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );*/

  /*return (
    <div className="home-container">
      <h1>Our Book Collection</h1>
      
      {selectedBook && (
        <div className="book-details-modal">
          <div className="book-details-content">
            <button 
              className="close-book-details-btn" 
              onClick={closeBookDetails}
            >
              &times;
            </button>
            <div className="book-details-inner">
              <h2>{selectedBook.title}</h2>
              <img src={`https://lib-backend-8o2x.onrender.com/${selectedBook.coverImage}`} alt={selectedBook.title} />
              <div className="book-details-grid">
                <div className="book-detail-item">
                  <strong>Author:</strong> {selectedBook.author}
                </div>
                <div className="book-detail-item">
                  <strong>ISBN:</strong> {selectedBook.isbn}
                </div>
                <div className="book-detail-item">
                  <strong>Publication Year:</strong> {selectedBook.publicationYear}
                </div>
                <div className="book-detail-item">
                  <strong>Genre:</strong> {selectedBook.genre}
                </div>
                <div className="book-detail-item">
                  <strong>Rental Status:</strong> {selectedBook.rentalStatus}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
  
      <div className="book-cards">
        {books.length === 0 ? (
          <p>No books available</p>
        ) : (
          books.map((book) => (
            <div 
              key={book.isbn} 
              className="book-card"
              onClick={() => handleBookClick(book)}
            >
              <img src={`https://lib-backend-8o2x.onrender.com/${book.coverImage}`} alt={book.title} className="book-cover" />
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre}</p>
              <p>Status: {book.rentalStatus}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );


};

export default HomePage;*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);

  const userEmail = localStorage.getItem('userEmail') || 
    JSON.parse(localStorage.getItem('userDetails'))?.email;

  console.log("Retrieved email:", userEmail);
  //const username = localStorage.getItem('username');
  //const imagePath = '"C:\Users\jinus\OneDrive\Desktop\project latest 2\Project\frontend\lib.jpg"';
  // Send email function
 // const imagePath = "https://drive.google.com/uc?id=1kI-mcaxZrhhUbNbNpDeeHbo9VZpDt0P9";

  const sendEmail = async (book) => {
    try {
      await axios.post("https://lib-backend-8o2x.onrender.com/send-email", {
        to: userEmail,
        subject: `Request to rent '${book.title}'`,
        html: `
          <h2>Dear User,</h2>
          <h1>Your request to rent <strong>'${book.title}'</strong> has been processed successfully.</h1>
          <p>Thank you for using our Library!</p>
           <img src="https://i.imgur.com/Ma8nGO0.png" alt="Book Cover" class="book-image" style="max-width: 200px; height: auto;">
        `
      });
      
      alert("Request sent successfully.");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email");
    }
  };
  

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://lib-backend-8o2x.onrender.com/api/books');
        console.log('Fetched Books:', response.data);
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []); // No need to include userEmail as a dependency

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const closeBookDetails = () => {
    setSelectedBook(null);
  };

  // Improved getImageUrl function with robust error handling
  const getImageUrl = (imagePath) => {
    const defaultImage = 'https://lib-backend-8o2x.onrender.com/uploads/default-book-cover.jpg';

    if (!imagePath) {
      return defaultImage;
    }

    try {
      const cleanPath = imagePath.replace(/^uploads\//, '');
      return `https://lib-backend-8o2x.onrender.com/uploads/${cleanPath}`;
    } catch (error) {
      console.error('Error processing image path:', error);
      return defaultImage;
    }
  };

  if (loading) {
    return <div className="loading">Loading books...</div>;
  }

  return (
    <div className="home-container">
      <h1>Books Inventory</h1>

      {selectedBook && (
        <div className="book-details-modal">
          <div className="book-details-modal-content">
            <button
              className="book-details-close-btn"
              onClick={closeBookDetails}
            >
              &times;
            </button>

            <div className="book-details-image-container">
              <img
                src={getImageUrl(selectedBook.coverImage)}
                alt={selectedBook.title}
                className="book-details-image"
                onError={(e) => {
                  e.target.src = 'https://lib-backend-8o2x.onrender.com/uploads/default-book-cover.jpg';
                }}
              />
            </div>

            <div className="book-details-info">
              <h2 className="book-details-title">{selectedBook.title}</h2>

              <div className="book-details-grid">
                <div className="book-detail-item">
                  <strong>Author</strong>
                  {selectedBook.author}
                </div>
                <div className="book-detail-item">
                  <strong>ISBN</strong>
                  {selectedBook.isbn}
                </div>
                <div className="book-detail-item">
                  <strong>Publication Year</strong>
                  {selectedBook.publicationYear}
                </div>
                <div className="book-detail-item">
                  <strong>Genre</strong>
                  {selectedBook.genre}
                </div>
                <div className="book-detail-item">
                  <strong>Rental Status</strong>
                  <span
                    className={`rental-status ${selectedBook.rentalStatus.toLowerCase()}`}
                  >
                    {selectedBook.rentalStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="book-cards">
        {books.length === 0 ? (
          <p>No books available</p>
        ) : (
          books.map((book) => (
            <div
              key={book.isbn}
              className="book-card"
              onClick={() => handleBookClick(book)}
            >
              <div className="book-cover-container">
                <img
                  src={getImageUrl(book.coverImage)}
                  alt={book.title}
                  className="book-cover"
                  onError={(e) => {
                    e.target.src = 'https://lib-backend-8o2x.onrender.com/uploads/default-book-cover.jpg';
                  }}
                />
              </div>
              <div className="book-card-content">
                <h3 className="book-title">{book.title}</h3>
                <div className="book-details">
                  <p><strong>Author:</strong> {book.author}</p>
                  <p><strong>Genre:</strong> {book.genre}</p>
                  <p>
                    <strong>Status:</strong>
                    <span
                      className={`rental-status ${book.rentalStatus.toLowerCase()}`}
                    >
                      {book.rentalStatus}
                    </span>
                  </p>
                  <button
                    className="rent-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      sendEmail(book);
                    }}
                    disabled={book.rentalStatus.toLowerCase() === 'rented'}
                  >
                    Rent Book
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
