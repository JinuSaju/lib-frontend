import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarAdmin from './NavbarAdmin';
const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://lib-backend-8o2x.onrender.com/api/users/all');
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  // Delete user handler
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://lib-backend-8o2x.onrender.com/api/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      alert('User deleted successfully');
    } catch (err) {
      setError('Failed to delete user');
      console.error(err);
    }
  };

  // Block user handler
  const handleBlockUser = async (userId) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.put(`https://lib-backend-8o2x.onrender.com/api/users/${userId}/block`);
      // Update local state to reflect blocked status
      setUsers(users.map(user => 
        user._id === userId 
          ? {...user, isBlocked: true, blockedAt: new Date()} 
          : user
      ));
      alert('User blocked successfully');
    } catch (err) {
      setError('Failed to block user');
      console.error(err);
    }
  };

  // Unblock user handler
  const handleUnblockUser = async (userId) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.put(`https://lib-backend-8o2x.onrender.com/api/users/${userId}/unblock`);
      // Update local state to reflect unblocked status
      setUsers(users.map(user => 
        user._id === userId 
          ? {...user, isBlocked: false, blockedAt: null} 
          : user
      ));
      alert('User unblocked successfully');
    } catch (err) {
      setError('Failed to unblock user');
      console.error(err);
    }
  };

  if (error) return <div style={{color: 'red'}}>{error}</div>;

  return (
    <div>
      {/* Add NavbarAdmin here */}
      <NavbarAdmin />
    <div>
      <h1>User Management</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Blocked At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <span style={{
                  color: user.isBlocked ? 'red' : 'green',
                  fontWeight: 'bold'
                }}>
                  {user.isBlocked ? 'Blocked' : 'Active'}
                </span>
              </td>
              <td>
                {user.blockedAt 
                  ? new Date(user.blockedAt).toLocaleString() 
                  : 'N/A'}
              </td>
              <td>
                <button onClick={() => handleDeleteUser(user._id)}>
                  Delete
                </button>
                {user.isBlocked ? (
                  <button 
                    onClick={() => handleUnblockUser(user._id)}
                    style={{
                      backgroundColor: 'green',
                      color: 'white',
                      marginLeft: '10px'
                    }}
                  >
                    Unblock
                  </button>
                ) : (
                  <button 
                    onClick={() => handleBlockUser(user._id)}
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      marginLeft: '10px'
                    }}
                  >
                    Block
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default AdminUserManagement;