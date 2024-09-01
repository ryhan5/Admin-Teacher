import React, { useState, useEffect } from 'react';

const streamOptions = ['MBA', 'MCA', 'BTech', 'BArch', 'BA', 'MTech'];

const EditTeacherForm = ({ teacher, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: teacher.name,
    joiningDate: teacher.joiningDate,
    birthDate: teacher.birthDate,
    streams: teacher.streams,
    subjects: teacher.subjects,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setFormData({
      name: teacher.name,
      joiningDate: teacher.joiningDate,
      birthDate: teacher.birthDate,
      streams: teacher.streams,
      subjects: teacher.subjects,
    });
  }, [teacher]);

  const updateFormData = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const handleStreamChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const streams = checked
        ? [...prevData.streams, value]
        : prevData.streams.filter((stream) => stream !== value);
      return { ...prevData, streams };
    });
  };

  const handleSubjectChange = (index, e) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index] = e.target.value;
    updateFormData('subjects', newSubjects);
  };

  const handleAddSubject = () => {
    updateFormData('subjects', [...formData.subjects, '']);
  };

  const handleRemoveSubject = (index) => {
    updateFormData('subjects', formData.subjects.filter((_, i) => i !== index));
  };

  const updateTeacher = async (updatedData) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:5000/api/teacher/${teacher.registerNumber}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (response.ok) {
        onUpdate(updatedData);
        alert("Teacher updated successfully!");
      } else {
        setError(data.message || 'Failed to update teacher.');
      }
    } catch (error) {
      console.error('Error updating teacher:', error);
      setError('Server error, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // const streamCodes = {
    //   MBA: "07",
    //   MCA: "06",
    //   BTech: "07",
    //   BArch: "08",
    //   BA: "09",
    //   MTech: "10"
    // };
    // const newRegisterNumber = `${teacher.registerNumber.slice(0, 6)}${formData.streams.reduce((acc, stream) => acc + (streamCodes[stream] || '00'), '')}`;
    
    const updatedData = { ...formData, registerNumber: newRegisterNumber };
    await updateTeacher(updatedData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Edit Teacher</h2>
        {error && <div className="bg-red-100 text-red-700 p-2 rounded-md text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium text-sm mb-1">Teacher Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md text-black text-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium text-sm mb-1">Date of Joining</label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md text-black text-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium text-sm mb-1">Date of Birth</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md text-black text-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium text-sm mb-1">Streams</label>
            <div className="grid grid-cols-2 gap-2">
              {streamOptions.map((stream) => (
                <div key={stream} className="flex items-center">
                  <input
                    type="checkbox"
                    id={stream}
                    value={stream}
                    checked={formData.streams.includes(stream)}
                    onChange={handleStreamChange}
                    className="mr-2 text-sm"
                  />
                  <label htmlFor={stream} className="text-gray-600 text-sm">{stream}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium text-sm mb-1">Subjects</label>
            {formData.subjects.map((subject, index) => (
              <div key={index} className="flex items-center space-x-2 mb-1">
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => handleSubjectChange(index, e)}
                  className="border border-gray-300 p-2 rounded-md text-black text-sm w-full focus:outline-none focus:border-blue-500"
                  placeholder="Subject"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSubject(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none"
                  aria-label={`Remove subject ${subject}`}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSubject}
              className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 focus:outline-none text-sm"
            >
              + Add Subject
            </button>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 focus:outline-none text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none text-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTeacherForm;
