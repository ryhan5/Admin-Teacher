import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeacherDashboard = () => {
  const [teachersData, setTeachersData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data for all teachers
    const fetchTeachersData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/teachers'); // Adjust the endpoint to fetch all teachers
        setTeachersData(response.data);
      } catch (error) {
        setErrorMessage('Failed to fetch teachers data.');
      } finally {
        setIsLoading(false); // Ensure loading state is turned off
      }
    };

    fetchTeachersData();
  }, []);

  if (isLoading) {
    return <div className="text-gray-500">Loading...</div>;
  }

  if (errorMessage) {
    return <div className="text-red-500">{errorMessage}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700 p-6">
      <h1 className="text-3xl font-bold mb-4">Teachers Dashboard</h1>
      {teachersData.length > 0 ? (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Registered Teachers</h2>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border p-2">Field</th>
                <th className="border p-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {teachersData.map((teacher, index) => (
                <React.Fragment key={index}>
                  {Object.entries(teacher).map(([key, value]) => (
                    <tr key={`${index}-${key}`}>
                      <td className="border p-2 font-semibold">{key}</td>
                      <td className="border p-2">
                        {Array.isArray(value) ? value.join(', ') : typeof value === 'object' && value !== null ? JSON.stringify(value) : value}
                      </td>
                    </tr>
                  ))}
                  <tr><td colSpan="2" className="border p-2 bg-gray-200"></td></tr> {/* Separator between teachers */}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No teachers data available.</div>
      )}
    </div>
  );
};

export default TeacherDashboard;
