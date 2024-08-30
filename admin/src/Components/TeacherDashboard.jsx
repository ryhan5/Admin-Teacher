import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TeacherDashboard = () => {
  const { registerNumber } = useParams(); // Get register number from URL
  const [teacherData, setTeacherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch teacher data by registration number
    const fetchTeacherData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/teacher/${registerNumber}`);
        setTeacherData(response.data);
      } catch (error) {
        setErrorMessage('Failed to fetch teacher data.');
      } finally {
        setIsLoading(false); // Ensure loading state is turned off
      }
    };

    fetchTeacherData();
  }, [registerNumber]);

  if (isLoading) {
    return <div className="text-gray-500">Loading...</div>;
  }

  if (errorMessage) {
    return <div className="text-red-500">{errorMessage}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Teacher Dashboard</h1>
      {teacherData ? (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Registered Data</h2>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border p-2">Field</th>
                <th className="border p-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(teacherData).map(([key, value]) => (
                <tr key={key}>
                  <td className="border p-2 font-semibold">{key}</td>
                  <td className="border p-2">
                    {Array.isArray(value) ? value.join(', ') : typeof value === 'object' && value !== null ? JSON.stringify(value) : value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No data available.</div>
      )}
    </div>
  );
};

export default TeacherDashboard;
