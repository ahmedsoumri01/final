import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminProfile = () => {
  const userId = localStorage.getItem('userId');
  const [user, setUser] = useState(null);
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No token available');
      }

      const response = await fetch(`http://localhost:8080/api/v1/admin/getMyProfile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (userType !== 'ADMIN' && userType === 'USER') {
      window.location.href = '/user/dashboard';
     
    }
    fetchUserData();
  }, [userId]);

  // Function to handle successful update
  const handleUpdateSuccess = (updatedUserData) => {
    // Trigger a re-render by updating the user state
    setUser(updatedUserData);
  };
 
  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-semibold mb-4">Admin Profile</h1>
 

      {user ? (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
            <p className="text-gray-800">{user.username}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <p className="text-gray-800">{user.email}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Role:</label>
            <p className="text-gray-800">{user.role}</p>
          </div>
          {/* Add other user details as needed */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default AdminProfile;
