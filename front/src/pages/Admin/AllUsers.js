import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
     // Check user role when the component mounts
     const userType = localStorage.getItem('userType');

     if (userType !== 'ADMIN' && userType === 'USER') {
       // Redirect to the login page if the user is not an admin
       window.location.href = '/user/dashboard';
     }
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');

        // Make sure a token is available before making the request
        if (!token) {
          throw new Error('No token available');
        }

        const response = await axios.get('http://localhost:8080/api/v1/admin/allusers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No token available');
      }

      await axios.delete(`http://localhost:8080/api/v1/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the users list after deletion
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto my-8 text-center">
    <h1 className="text-3xl font-semibold mb-4">All Users</h1>
  
    <table className="w-full text-sm rtl:text-right text-black dark:text-blue-100 bg-white">
      <thead className="text-xs text-white uppercase bg-gray-800 border-b border-gray-600 dark:text-white">
        <tr>
          <th className="border p-2">ID</th>
          <th className="border p-2">Username</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Role</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
            <td className="border p-2">{user.id}</td>
            <td className="border p-2">{user.username}</td>
            <td className="border p-2">{user.email}</td>
            <td className="border p-2">{user.role}</td>
            <td className="border p-2">
              <button
                onClick={() => handleDelete(user.id)}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              >
                Delete
              </button>
              <Link to={`/admin/edit-user/${user.id}`}>
                <button className="bg-orange-500 text-white px-4 py-2 rounded">Edit</button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  
  
  );
};

export default AllUsers;
