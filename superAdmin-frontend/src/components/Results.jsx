'use client';
import { useApp } from '../app/context/appContext';

import { useEffect, useState } from 'react';
import Search from './Search';
import '../styles/Patients.css';
import axiosInstance from '../axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faOptinMonster, faPage4 } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowUp,
  faChevronLeft,
  faChevronRight,
  faNewspaper,
  faPaperclip,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
export default function Results() {
  const [generalTests, setGeneralTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen } = useApp();
  const layoutstyle = {
    paddingLeft: isOpen ? '80px' : '200px',
    paddingTop: '60px',
  };

  useEffect(() => {
    const fetchResults = async () => {
      const labId = JSON.parse(localStorage.getItem('LabId'));
      try {
        const res = await axiosInstance.get(`/labs/${labId}/tests`);
        setGeneralTests(res.data);
        console.log(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchResults();
  }, []);
  if (loading) return <div>loading...</div>;
  return (
    <div style={layoutstyle}>
      <TestsTable data={generalTests} />
    </div>
  );
}

function TestsTable({ data }) {
  const [query, setQuery] = useState('');
  const ITEMS_PER_PAGE = 50;
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = data.tests.filter(test =>
    [test.TestName, test.status, test.testId]
      .join(' ')
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedData = filtered.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);
  const handleViewPdf = (labId, id) => {
    const url = `http://localhost:5000/official/${labId}/report/${id}/pdf`;
    window.open(url, '_self');
  };
  return (
    <div className="general-test">
      <h1>Results</h1>

      <Search
        query={query}
        setQuery={setQuery}
        placeholder="Search Result..."
      />

      <div className="general-test-table">
        <table>
          <thead>
            <tr className="table-head">
              <th>
                Test Name <FontAwesomeIcon icon={faArrowUp} />
              </th>
              <th>test ID</th>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="table-animate">
            {paginatedData.length > 0 ? (
              paginatedData
                .slice()
                .reverse()
                .map(test => (
                  <tr key={test.testId} className="table-row">
                    <td className="test-cell">
                      {' '}
                      <div className="avatar">
                        <FontAwesomeIcon icon={faPaperclip} />
                      </div>
                      <span>{test.testName}</span>
                      {test.testName}
                    </td>
                    <td>{test.testId}</td>
                    <td>{test.patientId.name}</td>
                    <td>{test.patientId.age}</td>
                    <td>{test.patientId.phone}</td>
                    <td>{new Date(test.createdAt).toLocaleDateString()}</td>
                    <td>
                      <span
                        className={`status ${
                          test.status == 'completed' ? 'completed' : 'pending'
                        }`}
                      >
                        {test.status}
                      </span>
                    </td>

                    <td>
                      {test.status == 'completed' && (
                        <button
                          className="view-btn"
                          onClick={() =>
                            handleViewPdf(test.labId._id, test._id)
                          }
                        >
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="7" className="not-found">
                  Result not found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {paginatedData.length > 0 ? (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? 'active' : ''}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Next <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
