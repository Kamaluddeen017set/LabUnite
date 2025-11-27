'use client';
import { useState, useEffect } from 'react';
import Search from './Search';
import { useApp } from '../app/context/appContext';
import '../styles/TestTable.css';
const TestHistoryTable = function () {
  const { isOpen, currentPatient } = useApp();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const filteredStus = currentPatient.tests.filter(test =>
    [test.status].join(' ').toLowerCase().includes(filter.toLowerCase())
  );
  const filtered = filteredStus.filter(test =>
    [test.testName].join(' ').toLowerCase().includes(query.toLowerCase())
  );

  const layoutstyle = {
    width: isOpen ? '89.6%' : '84%',
    marginLeft: isOpen ? '7%' : ' 14%',
  };

  return (
    <div className="patient-test-table-container" style={layoutstyle}>
      <h2 className="table-title">Test Records History</h2>
      <StatusFilter filter={filter} setFilter={setFilter} />
      <Search query={query} setQuery={setQuery} />
      <div className="table-wrapper">
        <table className="patient-test-table">
          <thead>
            <tr>
              <th>Test Id</th>
              <th>Test Name</th>
              <th>Sample Type</th>
              <th>Date Requested</th>
              <th>Date completed</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="table-animate">
            {filtered.length > 0 ? (
              [...filtered.reverse()].map(test => (
                <tr key={test.testName}>
                  <td>{test.testId}</td>
                  <td>{test.testName}</td>
                  <td>Test type</td>
                  <td>Date in</td>
                  <td>Date out</td>
                  <td className="status">
                    <span className={test.status}>{test.status}</span>
                  </td>
                  <td>
                    <button className="view-btn">View Result</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="not-found">test not found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function StatusFilter({ filter, setFilter }) {
  return (
    <div className="filter">
      <label className="filter-label ">Status Filter</label>
      <select
        value={filter}
        onChange={e => setFilter(e.target.value)}
        className="status-filter"
      >
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}
export default TestHistoryTable;
