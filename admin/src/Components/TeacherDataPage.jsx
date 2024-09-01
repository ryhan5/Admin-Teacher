import React, { useEffect, useState } from 'react';
import EditTeacherForm from './EditTeacherForm'; // Import the new component

const TeachersDataPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/teachers');
        const data = await response.json();

        if (response.ok) {
          setTeachers(data.teachers);
          setError(''); // Clear error if successful
        } else {
          setError(data.message || 'Failed to fetch teachers data.');
        }
      } catch (error) {
        console.error("Error fetching teachers' data:", error);
        setError('Server error, please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleCloseEditForm = () => {
    setSelectedTeacher(null);
  };

  const handleDelete = async (registerNumber) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/teacher/${registerNumber}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setTeachers((prevTeachers) => prevTeachers.filter((teacher) => teacher.registerNumber !== registerNumber));
          alert('Teacher deleted successfully!');
        } else {
          const data = await response.json();
          alert(data.message || 'Failed to delete teacher.');
        }
      } catch (error) {
        console.error('Error deleting teacher:', error);
        alert('Server error, please try again later.');
      }
    }
  };

  return (
    <div className="p-8 bg-gray-800 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Teachers Data</h1>

      {loading ? (
        <p className="text-blue-500">Loading...</p>
      ) : error ? (
        <div>
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => setError('')} // Clear error and retry
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      ) : (
        <table className="min-w-full bg-gray-700 border border-gray-600 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-600">
              <th className="py-2 px-4 border-b border-gray-500">Register Number</th>
              <th className="py-2 px-4 border-b border-gray-500">Name</th>
              <th className="py-2 px-4 border-b border-gray-500">Joining Date</th>
              <th className="py-2 px-4 border-b border-gray-500">Age</th>
              <th className="py-2 px-4 border-b border-gray-500">Subjects</th>
              <th className="py-2 px-4 border-b border-gray-500">Streams</th>
              <th className="py-2 px-4 border-b border-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => {
              const birthDate = new Date(teacher.birthDate);
              const age = new Date().getFullYear() - birthDate.getFullYear();

              return (
                <tr key={teacher.registerNumber} className="hover:bg-gray-600">
                  <td className="py-2 px-4 border-b border-gray-500">{teacher.registerNumber}</td>
                  <td className="py-2 px-4 border-b border-gray-500">{teacher.name}</td>
                  <td className="py-2 px-4 border-b border-gray-500">{teacher.joiningDate}</td>
                  <td className="py-2 px-4 border-b border-gray-500">{age}</td>
                  <td className="py-2 px-4 border-b border-gray-500">{teacher.subjects.join(', ')}</td>
                  <td className="py-2 px-4 border-b border-gray-500">{teacher.streams.join(', ')}</td>
                  <td className="py-2 px-4 border-b border-gray-500 flex space-x-2">
                    <button
                      onClick={() => handleEdit(teacher)}
                      className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(teacher.registerNumber)}
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
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

      {selectedTeacher && (
        <EditTeacherForm
          teacher={selectedTeacher}
          onClose={handleCloseEditForm}
          onUpdate={(updatedTeacher) => {
            setTeachers((prevTeachers) =>
              prevTeachers.map((teacher) =>
                teacher.registerNumber === updatedTeacher.registerNumber
                  ? updatedTeacher
                  : teacher
              )
            );
            handleCloseEditForm();
          }}
        />
      )}
    </div>
  );
};

export default TeachersDataPage;
