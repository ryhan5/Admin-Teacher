import React, { useEffect, useState } from 'react';

const TeachersDataPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/teachers');
        const data = await response.json();

        if (response.ok) {
          setTeachers(data.teachers);
        } else {
          setError(data.message || 'Failed to fetch teachers data.');
        }
      } catch (error) {
        console.error("Error fetching teachers' data:", error);
        setError('Server error, please try again later.');
      }
    };

    fetchTeachers();
  }, []);

  const handleEdit = async (registerNumber) => {
    const teacherToEdit = teachers.find((teacher) => teacher.registerNumber === registerNumber);
    if (teacherToEdit) {
      const newName = prompt("Enter new name:", teacherToEdit.name);
      const newJoiningDate = prompt("Enter new joining date:", teacherToEdit.joiningDate);

      if (newName && newJoiningDate) {
        try {
          const response = await fetch(`http://localhost:5000/api/teacher/${registerNumber}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName, joiningDate: newJoiningDate }),
          });

          const data = await response.json();

          if (response.ok) {
            setTeachers((prevTeachers) =>
              prevTeachers.map((teacher) =>
                teacher.registerNumber === registerNumber
                  ? { ...teacher, name: newName, joiningDate: newJoiningDate }
                  : teacher
              )
            );
            alert("Teacher updated successfully!");
          } else {
            alert(data.message || 'Failed to update teacher.');
          }
        } catch (error) {
          console.error('Error updating teacher:', error);
          alert('Server error, please try again later.');
        }
      }
    }
  };

  const handleDelete = async (registerNumber) => {
    if (window.confirm(`Are you sure you want to delete the teacher with register number ${registerNumber}?`)) {
      try {
        const response = await fetch(`http://localhost:5000/api/teacher/${registerNumber}`, {
          method: 'DELETE',
        });

        const data = await response.json();

        if (response.ok) {
          setTeachers((prevTeachers) =>
            prevTeachers.filter((teacher) => teacher.registerNumber !== registerNumber)
          );
          alert("Teacher deleted successfully!");
        } else {
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
    </div>
  );
};

export default TeachersDataPage;
