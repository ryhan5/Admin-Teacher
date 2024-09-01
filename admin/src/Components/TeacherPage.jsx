import React, { useState } from 'react';
import axios from 'axios';

const TeacherPage = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: '',
    joiningDate: '',
    password: '',
    birthDate: '',
    streams: [],
    subjects: [''],
  });

  const [registerNumber, setRegisterNumber] = useState(null);

  const streamOptions = ['MBA', 'MCA', 'BTech', 'BArch', 'BA', 'MTech'];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle stream selection changes
  const handleStreamChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const streams = checked
        ? [...prevData.streams, value]
        : prevData.streams.filter((stream) => stream !== value);
      return { ...prevData, streams };
    });
  };

  // Handle adding/removing subjects dynamically
  const handleSubjectChange = (index, e) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index] = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      subjects: newSubjects,
    }));
  };

  const handleAddSubject = () => {
    setFormData((prevData) => ({
      ...prevData,
      subjects: [...prevData.subjects, ''],
    }));
  };

  const handleRemoveSubject = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      subjects: prevData.subjects.filter((_, i) => i !== index),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/api/register-teacher', formData);
      setRegisterNumber(response.data.registerNumber); // Assuming the server returns the register number
      alert('Teacher registered successfully!');
    } catch (error) {
      console.error('Error registering teacher:', error);
      alert('Error registering teacher');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700 p-6">
      <h1 className="text-3xl font-bold mb-4">Teacher Registration</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
        <div>
          <label className="block font-semibold">Teacher Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Date of Joining:</label>
          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Date of Birth:</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Stream:</label>
          <div className="flex flex-wrap">
            {streamOptions.map((stream) => (
              <label key={stream} className="mr-4">
                <input
                  type="checkbox"
                  value={stream}
                  checked={formData.streams.includes(stream)}
                  onChange={handleStreamChange}
                  className="mr-2"
                />
                {stream}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-semibold">Subjects:</label>
          {formData.subjects.map((subject, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                value={subject}
                onChange={(e) => handleSubjectChange(index, e)}
                className="border p-2 rounded w-full"
              />
              {formData.subjects.length > 1 && (
                <button type="button" onClick={() => handleRemoveSubject(index)} className="bg-red-500 text-white px-2 py-1 rounded">
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddSubject} className="bg-blue-500 text-white px-2 py-1 rounded">
            Add Subject
          </button>
        </div>
        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
          Register
        </button>
      </form>
      {registerNumber && <p className="mt-4">Registered Number: {registerNumber}</p>}
    </div>
  );
};

export default TeacherPage;