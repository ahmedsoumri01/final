import React, { useEffect ,useState } from 'react';
import UserProfile from './UserProfile';
import PointYourDay from './PointYourDay';

export default function UserDashboard() {
  const [interfaceSelected, setInterfaceSelected] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
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
useEffect(() => {
    // Check user role when the component mounts
    const userType = localStorage.getItem('userType');

    if (userType !== 'USER' && userType === 'ADMIN') {
      // Redirect to the login page if the user is not an admin
      window.location.href = '/admin/dashboard';
    }
  }, []);
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
          {textVisible && 'User Profile'}
        </li>

        <li
          id="CheckPoint"
          onClick={section}
          className="p-4 cursor-pointer hover:bg-white hover:text-black flex items-center"
        >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
</svg>

          {textVisible && ' pointage'}
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
            return    <UserProfile />;
            case 1:
            return <PointYourDay />;
    
          default:
            return null;
        }
      })()}
   
    </div>
  </div>
  );
}
