import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();

  const handleAdminAuth = async () => {
    const adminId = prompt("Enter Admin ID:");
    const adminPassword = prompt("Enter Admin Password:");

    try {
      const response = await fetch('http://localhost:5000/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminId, adminPassword }),
      });

      const data = await response.json();

      if (data.success) {
        navigate('/teachers-data'); // Navigate to the teachers' data page
      } else {
        setAuthError(data.message || 'Authentication failed');
      }
    } catch (error) {
      console.error("Error authenticating admin:", error);
      setAuthError('Server error, please try again later.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700">
      <h1 className="text-3xl font-bold mb-6">Admin Page</h1>
      <div className="flex space-x-4">
        {/* Existing buttons */}
        <Link to="/teacher">
          <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
            Teacher-Registration
          </button>
        </Link>
        <Link to="/student">
          <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600">
            Student-Registration
          </button>
        </Link>
        <Link to="/signin">
          <button className="bg-purple-500 text-white font-semibold py-2 px-4 rounded hover:bg-purple-600">
            Teacher Sign-in
          </button>
        </Link>
        {/* New admin authentication button */}
        <button
          onClick={handleAdminAuth}
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600"
        >
          Admin Auth & View Teachers
        </button>
      </div>
      {authError && <p className="text-red-500 mt-4">{authError}</p>}
    </div>
  );
};

export default AdminPage;
