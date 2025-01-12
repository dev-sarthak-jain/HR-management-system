import React, { useState } from 'react';
import Papa from 'papaparse';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import './style.css';

const AddComponent = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setFile(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleClick = () => {
    const fileUpload = document.getElementById('fileupload');
    fileUpload.value = null; // Reset file input
    fileUpload.click();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a file before submitting.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      Papa.parse(reader.result, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const jsonData = JSON.stringify(results.data);
          console.log('Sending JSON:', jsonData);
          fetch('http://127.0.0.1:8000/api/employee_create/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: jsonData,
          })
            .then((response) => {
              if (response.status === 201) {
                setFile(null); // Clear the file state after submission
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
              } else {
                console.error('Failed to submit file:', response.status);
              }
              return response.json();
            })
            .then((data) => console.log('Response data:', data))
            .catch((error) => console.error('Error:', error));
        },
      });
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <div className="w-full h-20 add-component-head" />
      <div className="flex flex-col items-center" style={{ transform: 'translate(0, -40px)' }}>
        <div className="" style={{ background: '#414455', width: '80px', height: '80px', borderRadius: '999px' }}>
          <img
            src="https://assets.codepen.io/3685267/res-react-dash-rocket.svg"
            alt=""
            className="w-full h-full"
          />
        </div>
        <div className="text-white font-bold mt-3">Add new user data</div>
        <div className="mt-2">Simply create your first component</div>
        <div className="mt-1">Just click on the button</div>
        <div
          className="flex items-center p-3 mt-3"
          style={{ background: '#2f49d1', borderRadius: '15px', padding: '8px 16px', justifyContent: 'center', color: 'white' }}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            id="fileupload"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            onClick={(event) => {
              event.target.value = null;
            }}
          />
          <AiOutlineCloudUpload className="w-5 h-5 mr-2" />
          <button style={{ cursor: 'pointer' }}>
            Add Component
          </button>
        </div>
        {file && (
          <div className="mt-2 text-white truncate max-w-xs">
            File selected: {file.name}
          </div>
        )}
        <button className="mt-4 p-2 bg-blue-600 text-white rounded-lg" onClick={handleSubmit} style={{ display: file ? 'block' : 'none' }}>
          Submit
        </button>
        {showToast && (
          <div className="mt-4 p-2 bg-green-600 text-white rounded-lg">
            File submitted successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default AddComponent;
