
import React from 'react';


const PopupTable = ({ isVisible, selectedYear, jobData, onClose }) => {
  if (!isVisible || !selectedYear) return null;

  return (
    <div className="popup">
      <button onClick={onClose} className="close-button">Close</button>
      <h2>Job Titles and Number of Jobs for {selectedYear}</h2>
      <table className="popup-table">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Total Jobs</th>
          </tr>
        </thead>
        <tbody>
          {jobData[selectedYear]?.map((item, index) => (
            <tr key={index}>
              <td>{item.job_title}</td>
              <td>{item.total_jobs}</td>
            </tr>
          )) || (
            <tr>
              <td colSpan="2">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PopupTable;
