import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const EditUser = () => {
  const [interfaceSelected, setInterfaceSelected] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
     // Check user role when the component mounts
     const userType = localStorage.getItem('userType');

     if (userType !== 'ADMIN' && userType === 'USER') {
       // Redirect to the login page if the user is not an admin
       window.location.href = '/user/dashboard';
     }
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');

        // Make sure a token is available before making the request
        if (!token) {
          throw new Error('No token available');
        }

        const response = await axios.get(`http://localhost:8080/api/v1/admin/getMyProfile/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');

      // Make sure a token is available before making the request
      if (!token) {
        throw new Error('No token available');
      }

      // Send a PUT request to update the user
      await axios.put(
        `http://localhost:8080/api/v1/admin/update-user/${id}`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('User updated successfully');
      alert('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };
  const toggleTextVisibility = () => {
    setTextVisible(!textVisible);
  };


  const handleLogout = () => {
    // Clear all items saved in localStorage
    localStorage.clear();

    // Redirect to the login page
    window.location.href = '/';
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
 
    <div className="flex h-screen">
    {/* Sidebar */}
    <div
      className={`bg-black text-white w-${textVisible ? '64' : '14'} transition-all`}
    >
      <button
        onClick={toggleTextVisibility}
        className="p-4 cursor-pointer hover:bg-white hover:text-black"
      >
        {textVisible ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        )}
      </button>
      <ul>
   

        <li
          id="ManageUsers"
      
          className="p-4 cursor-pointer hover:bg-white hover:text-black flex items-center"
        >
          <Link to="/user/dashboard">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z" />
          </svg>
          {textVisible && 'Manage Users'}
          </Link>
        </li>

        <li
          className="p-4 cursor-pointer hover:bg-red-500 hover:text-white flex items-center mt-auto"
          onClick={handleLogout}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
          {textVisible && 'Logout'}
        </li>
      </ul>
    </div>

    {/* Main Content */}
    <div className="flex-1 p-8 bg-gray-200 overflow-hidden">
      <h1 className="text-3xl font-bold mb-8 text-center">Edit User Data</h1>
 <form>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={user.username}
                      onChange={(e) => setUser({ ...user, username: e.target.value })}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
          
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
          
                  <div className="mb-4">
                    <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
                      Role
                    </label>
                    <input
                    disabled={true}
                      type="text"
                      id="role"
                      name="role"
                      value={user.role}
                      onChange={(e) => setUser({ ...user, role: e.target.value })}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={handleUpdate}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Update
                    </button>
                
                  </div>
                </form>
    </div>
  </div>
  );
};

export default EditUser;
