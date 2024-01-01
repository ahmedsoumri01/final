import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PointYourDay = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
     // Check user role when the component mounts
     const userType = localStorage.getItem('userType');

     if (userType !== 'USER' && userType === 'ADMIN') {
       // Redirect to the login page if the user is not an admin
       window.location.href = '/admin/dashboard';
     }
    // Get the current date when the component mounts
    
    const date = new Date();
    setCurrentDate(date.toISOString().split('T')[0]);
  }, []);

  const handleGetLocation = () => {
    // Check if Geolocation is supported by the browser
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toFixed(6));
          setLongitude(position.coords.longitude.toFixed(6));
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser.');
    }
  };

  const handlePointYourDay = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      console.log("userId: " + userId);

      if (!token) {
        // Handle the case where the user is not authenticated
        console.error('User not authenticated');
        return;
      }

      const response = await axios.post(
        'http://localhost:8080/api/v1/user/point',
        {
          userId: userId, // Replace with the actual user ID
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Pointing successful:', response.data);
      alert('Pointing successful');
      // You can perform additional actions after successful pointing
    } catch (error) {
      console.error('Pointing failed:', error.response.data);
      // Handle error: show an error message or redirect
    }
  };

  return (
    <div className="container mx-auto my-8 text-center">
    <h1 className="text-4xl font-semibold mb-4">Point Your Day</h1>

    <div className="mb-4">
      <p className="text-gray-700 text-lg font-bold mb-2">Current Date: {currentDate}</p>
    </div>

    <form className="space-y-4">
      <div className="mb-4">
        <label htmlFor="latitude" className="block text-gray-700 text-sm font-bold mb-2">
          Latitude
        </label>
        <input
          type="text"
          id="latitude"
          name="latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="longitude" className="block text-gray-700 text-sm font-bold mb-2">
          Longitude
        </label>
        <input
          type="text"
          id="longitude"
          name="longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4 flex justify-center">
        <button
          type="button"
          onClick={handleGetLocation}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Get Location
        </button>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={handlePointYourDay}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Point Your Day
        </button>
      </div>
    </form>
  </div>
  );
};

export default PointYourDay;
