import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Page</h1>
      <div className="flex space-x-4">
        <Link to="/teacher">
          <button
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
            aria-label="Teacher Page"
          >
            Teacher
          </button>
        </Link>
        <Link to="/student">
          <button
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600"
            aria-label="Student Page"
          >
            Student
          </button>
        </Link>
        <Link to="/signin">
          <button
            className="bg-purple-500 text-white font-semibold py-2 px-4 rounded hover:bg-purple-600"
            aria-label="Teacher Sign-in"
          >
            Teacher Sign-in
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
