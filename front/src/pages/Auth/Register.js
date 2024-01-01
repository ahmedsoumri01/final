import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import animation from '../assets/animation.json';
import Lottie from 'lottie-react';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    // Input validation
    if (!username || !email || !password) {
      console.log('Please fill in all fields.');
      return;
    }

    if (!email.includes('@')) {
      console.log('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      console.log('Password must be at least 6 characters long.');
      return;
    }

    // Make API request using Axios
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/register', {
        username: username,
        email: email,
        password: password,
      });

      console.log('Registration successful:', response.data);
      alert('Registration successful!');
      setEmail('');
      setPassword('');
      setUsername('');

      // Redirect or show a success message as needed
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      alert('Registration failed. Please try again.');
      // Handle error: show an error message or redirect
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center h-screen">
       <div className="flex justify-center items-center h-full" style={{maxWidth:"50%"}}>
        <Lottie animationData={animation}/>
      </div>
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        
        <h1 className="text-3xl font-bold mb-4">Register</h1>
        <input
          className="mb-4 p-2 border border-gray-300 rounded w-full shadow-md"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="mb-4 p-2 border border-gray-300 rounded w-full shadow-md"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative w-full mb-4">
          <input
            className="p-2 border border-gray-300 rounded w-full shadow-md"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2 12s3 4.5 5 6a9 9 0 0010 0c2-1.5 5-6 5-6"
                ></path>
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2 12s3 4.5 5 6a9 9 0 0010 0c2-1.5 5-6 5-6"
                ></path>
              </svg>
            )}
          </span>
        </div>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={handleRegister}
          >
            Register
          </button>
          <Link to="/" className="text-blue-500 cursor-pointer">
            Go back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
