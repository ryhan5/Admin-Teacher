import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const [formData, setFormData] = useState({
    registerNumber: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/signin-teacher', formData);
      if (response.data.success) {
        setSuccessMessage('Sign-in successful!');
        // Redirect to the dashboard with the registration number
        navigate(`/dashboard/${encodeURIComponent(formData.registerNumber)}`);
      } else {
        setErrorMessage('Invalid registration number or password.');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'An error occurred. Please try again.');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Teacher Sign In</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
        <div>
          <label className="block font-semibold">Registration Number:</label>
          <input
            type="text"
            name="registerNumber"
            value={formData.registerNumber}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Password: </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Sign In
        </button>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
      </form>
    </div>
  );
};

export default SignInPage;
