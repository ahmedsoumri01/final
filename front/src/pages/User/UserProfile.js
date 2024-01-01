import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  // Retrieve user details from local storage
  const userId = localStorage.getItem('userId');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check user role when the component mounts
    const userType = localStorage.getItem('userType');

    if (userType !== 'USER' && userType === 'ADMIN') {
      // Redirect to the login page if the user is not an admin
      window.location.href = '/admin/dashboard';
    }
    
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

    fetchUserData();
  }, [userId]);

  return (
    <div className="container mx-auto my-8">
    <h1 className="text-3xl font-semibold mb-4 text-center">User Profile</h1>

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
      </div>
    ) : (
      <p>Loading user data...</p>
    )}
  </div>
  );
};

export default UserProfile;
