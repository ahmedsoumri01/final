import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminProfile from './AdminProfile';
import AllUsers from './AllUsers';
import AdminCheckPoint from './AdminCheckPoint';
export default function AdminDashboard() {
  const [interfaceSelected, setInterfaceSelected] = useState(0);
  const [textVisible, setTextVisible] = useState(true);

  useEffect(() => {
    // Check user role when the component mounts
    const userType = localStorage.getItem('userType');

    if (userType !== 'ADMIN' && userType === 'USER') {
      // Redirect to the login page if the user is not an admin
      window.location.href = '/user/dashboard';
    }
  }, []);

  const toggleTextVisibility = () => {
    setTextVisible(!textVisible);
  };

  const section = (e) => {
    switch (e.target.id) {
      case 'CheckPoint':
        setInterfaceSelected(1);
        break;
      case 'ManageUsers':
        setInterfaceSelected(2);
        break;
      default:
        setInterfaceSelected(0);
        break;
    }
  };

  const handleLogout = () => {
    // Clear all items saved in localStorage
    localStorage.clear();

    // Redirect to the login page
    window.location.href = '/';
  };

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
          <li></li>

          <li
            id="AdminProfile"
            onClick={section}
            className="p-4 cursor-pointer hover:bg-white hover:text-black flex items-center"
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
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {textVisible && 'Admin Profile'}
          </li>

          <li
            id="CheckPoint"
            onClick={section}
            className="p-4 cursor-pointer hover:bg-white hover:text-black flex items-center"
          >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
</svg>

            {textVisible && 'check pointage'}
          </li>

          <li
            id="ManageUsers"
            onClick={section}
            className="p-4 cursor-pointer hover:bg-white hover:text-black flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z" />
            </svg>
            {textVisible && 'Manage Users'}
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
        {(() => {
          switch (interfaceSelected) {
            case 0:
              return <AdminProfile />;
              case 1:
              return <AdminCheckPoint />;
            case 2:
              return <AllUsers />;
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
}
