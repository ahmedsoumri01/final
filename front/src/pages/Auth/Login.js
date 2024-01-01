import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import login from '../assets/login.json';
import Lottie from 'lottie-react';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    // Input validation
    if (!email || !password) {
      console.log('Please fill in all fields.');
      alert('Please fill in all fields.');
      return;
    }

    try {
      // Make API request using Axios
      const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', {
        email: email,
        password: password,
      });

      // Extract token from response
      const token = response.data.token; 
      const user = response.data;
      const userId = response.data.id;

      // Save token to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userType', user.role);

      alert('Login successful!');
      setEmail('');
      setPassword('');
console.log(user);
      // Redirect based on user's role
      if (user.role === 'ADMIN') {
        window.location.href = '/admin/dashboard';
      } else if (user.role === 'USER') {
        window.location.href = '/user/dashboard';
      }
    } catch (error) {
      console.error('Login failed:', error.response.data);
      // Handle error: show an error message or redirect
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex justify-center items-center h-full">
        <Lottie animationData={login}/>
      </div>
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <input
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative w-full mb-4">
          <input
            className="p-2 border border-gray-300 rounded w-full"
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
        <p className="mb-2">
          <Link to="/auth/forget-password" className="text-blue-500 cursor-pointer">
            Forgot your password?
          </Link>
        </p>
        <p>
          Don't have an account?{' '}
          <Link to="/auth/register" className="text-blue-500">
            Register here
          </Link>
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
