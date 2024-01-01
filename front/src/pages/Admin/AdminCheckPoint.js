import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDGTagwB5al42nHrUt39DHwBD_uIVIyHVQ';

const MapToggleBox = ({ latitude, longitude, onClose }) => (
  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center">
    <div className="bg-white p-4 rounded">
      {/* Use an iframe to embed the Google Map */}
      <iframe
        title="Google Map"
        width="100%"
        height="300"
        frameBorder="0"
        style={{ border: 0 }}
        src={`https://www.google.com/maps/embed/v1/view?key=${GOOGLE_MAPS_API_KEY}&center=${latitude},${longitude}&zoom=13`}
        allowFullScreen
      ></iframe>
      <button onClick={onClose} className="mt-2 p-1 bg-blue-500 text-white">
        Close Map
      </button>
    </div>
  </div>
);

const AdminCheckPoint = () => {
  const [pointages, setPointages] = useState([]);
  const [filteredPointages, setFilteredPointages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);

  useEffect(() => {
     // Check user role when the component mounts
     const userType = localStorage.getItem('userType');

     if (userType !== 'ADMIN' && userType === 'USER') {
       // Redirect to the login page if the user is not an admin
       window.location.href = '/user/dashboard';
     }
    const fetchAllPoints = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('No token available');
        }

        const response = await axios.get('http://localhost:8080/api/v1/admin/all-points', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPointages(response.data);
        setFilteredPointages(response.data); // Initially, set filtered points to all points
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAllPoints();
  }, []);

  const handleFilter = (date) => {
    if (date) {
      const filtered = pointages.filter((pointage) => pointage.pointedDate.startsWith(date));
      setFilteredPointages(filtered);
    } else {
      // If no date is provided, show all points
      setFilteredPointages(pointages);
    }
  };

  const handleToggleMap = (point) => {
    setSelectedPoint(selectedPoint === point ? null : point);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto my-8 text-center">
    <h1 className="text-3xl font-semibold mb-4">Pointages</h1>
  
    {/* Button to return to admin dashboard */}
    
    {/* Filter input */}
    <div className="flex items-center justify-center mt-7">
  <input
    id="dateFilter"
    type="date"
    className="p-3 border border-gray-300 rounded w-80"
  />
  <button
    onClick={() => handleFilter(document.getElementById('dateFilter').value)}
    className="p-2 bg-blue-500 text-white ml-4 w-20"
  >
    Filter
  </button>
</div>
  
    {/* Map display */}
    {selectedPoint && (
      <MapToggleBox
        latitude={selectedPoint.latitude}
        longitude={selectedPoint.longitude}
        onClose={() => handleToggleMap(null)}
      />
    )}
  
    {/* Table display */}
    <table className="w-full text-sm rtl:text-right text-black dark:text-blue-100 bg-white mt-5">
      <thead className="text-xs text-white uppercase bg-gray-800 border-b border-gray-600 dark:text-white">
        <tr>
          <th className="border p-2">ID</th>
          <th className="border p-2">User ID</th>
          <th className="border p-2">Latitude</th>
          <th className="border p-2">Longitude</th>
          <th className="border p-2">Pointed Date</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredPointages.map((pointage) => (
          <tr key={pointage.id}>
            <td className="border p-2">{pointage.id}</td>
            <td className="border p-2">{pointage.user.id}</td>
            <td className="border p-2">{pointage.latitude}</td>
            <td className="border p-2">{pointage.longitude}</td>
            <td className="border p-2">{pointage.pointedDate}</td>
            <td className="border p-2">
              <button
                onClick={() => handleToggleMap(pointage)}
                className="ml-2 p-1 bg-blue-500 text-white"
              >
                Show Map
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  );
};

export default AdminCheckPoint;
