import React, { useState } from 'react';
import jsonData from './data.json'; 
import jobData from './second_data.json'
import './Table.css'; 
import LineChart from './LineChart';
import PopupTable from './PopUpTable';
const App = () => {
  const [tableData, setTableData] = useState(jsonData);
  const [sortColumn, setSortColumn] = useState(null); 
  const [sortOrder, setSortOrder] = useState(null);   
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); 

  const [selectedYear, setSelectedYear] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);


  const handleRowClick = (year) => {
    setSelectedYear(year);
    setIsPopupVisible(true);
  };

  
  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };




  const handleSort = (key, direction) => {
    const sortedData = [...tableData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setTableData(sortedData);
  };

 
  const handleSortClick = (direction) => {
    if (sortColumn) {
      handleSort(sortColumn, direction);
    }
  };

  return (
    <>
      <div className="container">

        <div className="table-container">
          <table className="sortable-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Total Jobs</th>
                <th>Average Salary (USD)</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index} onClick={() => handleRowClick(row.work_year)}>
                  <td>{row.work_year}</td>
                  <td>{row.total_jobs}</td>
                  <td>{row.avg_salary_usd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

     
        <div className="sort-container">
          <button
            onClick={() => setIsDropdownVisible(!isDropdownVisible)}
            className="sort-button"
          >
            Sort by
          </button>

          {isDropdownVisible && (
            <div className="sort-options">
              <label htmlFor="sortColumn">Select Column:</label>
              <select
                id="sortColumn"
                onChange={(e) => setSortColumn(e.target.value)}
                className="sort-select"
              >
                <option value="">-- Select Column --</option>
                <option value="work_year">Year</option>
                <option value="total_jobs">Total Jobs</option>
                <option value="avg_salary_usd">Average Salary (USD)</option>
              </select>

         
              <div className="sort-buttons">
                <button
                  onClick={() => handleSortClick('ascending')}
                  className="sort-button-asc"
                >
                  Ascending
                </button>
                <button
                  onClick={() => handleSortClick('descending')}
                  className="sort-button-desc"
                >
                  Descending
                </button>
              </div>
            </div>
          )}
        </div>

      
        <PopupTable
          isVisible={isPopupVisible}
          selectedYear={selectedYear}
          jobData={jobData}
          onClose={handleClosePopup}
        />


      </div>

      <LineChart data={jsonData} />
    </>
  );
};

export default App;
