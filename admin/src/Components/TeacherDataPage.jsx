import React, { useEffect, useState } from 'react';

const TeachersDataPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin-auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // Use stored admin credentials or reauthenticate
          body: JSON.stringify({ adminId: 'admin', adminPassword: 'pass' }),
        });

        const data = await response.json();
        if (data.success) {
          setTeachers(data.teachers);
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.error("Error fetching teachers' data:", error);
        setError('Server error, please try again later.');
      }
    };

    fetchTeachers();
  }, []);

  const handleEdit = (registerNumber) => {
    // Implement edit functionality
    console.log(`Edit teacher with register number: ${registerNumber}`);
  };

  const handleDelete = (registerNumber) => {
    // Implement delete functionality
    console.log(`Delete teacher with register number: ${registerNumber}`);
  };

  return (
    <div className="p-8 bg-gray-800 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Teachers Data</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="min-w-full bg-gray-700">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-600">Register Number</th>
              <th className="py-2 px-4 border-b border-gray-600">Name</th>
              <th className="py-2 px-4 border-b border-gray-600">Joining Date</th>
              <th className="py-2 px-4 border-b border-gray-600">Age</th>
              <th className="py-2 px-4 border-b border-gray-600">Subjects</th>
              <th className="py-2 px-4 border-b border-gray-600">Streams</th>
              <th className="py-2 px-4 border-b border-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => {
              const birthDate = new Date(teacher.birthDate);
              const age = new Date().getFullYear() - birthDate.getFullYear();

              return (
                <tr key={teacher.registerNumber}>
                  <td className="py-2 px-4 border-b border-gray-600">{teacher.registerNumber}</td>
                  <td className="py-2 px-4 border-b border-gray-600">{teacher.name}</td>
                  <td className="py-2 px-4 border-b border-gray-600">{teacher.joiningDate}</td>
                  <td className="py-2 px-4 border-b border-gray-600">{age}</td>
                  <td className="py-2 px-4 border-b border-gray-600">{teacher.subjects.join(', ')}</td>
                  <td className="py-2 px-4 border-b border-gray-600">{teacher.streams.join(', ')}</td>
                  <td className="py-2 px-4 border-b border-gray-600">
                    <button
                      onClick={() => handleEdit(teacher.registerNumber)}
                      className="bg-blue-500 text-white py-1 px-2 rounded mr-2 hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(teacher.registerNumber)}
                      className="bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TeachersDataPage;

