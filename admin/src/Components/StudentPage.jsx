import React from 'react';
import { Link } from 'react-router-dom';

const StudentPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700 p-6">
      <h1 className="text-3xl font-bold text-white">Welcome, Student!</h1>
      <p className="text-white mt-4">This is your student portal. From here, you can:</p>
      <div className="mt-6">
        <Link to="/register-courses">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Register for Courses
          </button>
        </Link>
        <Link to="/view-grades">
          <button className="bg-green-500 text-white py-2 px-4 ml-4 rounded hover:bg-green-600">
            View Grades
          </button>
        </Link>
      </div>
      <nav className="mt-8">
        <Link to="/dashboard" className="text-blue-400 hover:text-blue-600">
          Go to Dashboard
        </Link>
      </nav>
    </div>
  );
};

export default StudentPage;
