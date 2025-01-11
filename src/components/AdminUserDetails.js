import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to access URL parameters

const AdminUserDetails = () => {
  const { id } = useParams(); // Get user ID from URL
  const [userDetails, setUserDetails] = useState(null);
  const [rentedBooks, setRentedBooks] = useState([]);

  useEffect(() => {
    // Fetch user details and rented books using the user ID from the URL
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://lib-backend-8o2x.onrender.com/api/user/${id}`);
        const data = await response.json();
        setUserDetails(data.user);
        setRentedBooks(data.books); // Assuming the response contains both user and books data
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [id]);

  return (
    <div>
      <h1>User Details</h1>
      {userDetails ? (
        <div>
          <p>Name: {userDetails.name}</p>
          <p>Email: {userDetails.email}</p>
          <h2>Rented Books</h2>
          <table border="1">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>ISBN</th>
                <th>Rental Status</th>
              </tr>
            </thead>
            <tbody>
              {rentedBooks.length === 0 ? (
                <tr>
                  <td colSpan="5">No books rented</td>
                </tr>
              ) : (
                rentedBooks.map((book) => (
                  <tr key={book.isbn}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.genre}</td>
                    <td>{book.isbn}</td>
                    <td>{book.rentalStatus ? 'Rented' : 'Available'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default AdminUserDetails;
