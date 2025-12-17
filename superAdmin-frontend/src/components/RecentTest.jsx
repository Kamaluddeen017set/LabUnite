import { useState } from 'react';
import Search from './Search';
import '../styles/TablesStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
export default function RecentTests({ generalTests, fetchLoaded }) {
  if (!fetchLoaded) return <div>loading...</div>;
  return (
    <div className="div9">
      <PatientTable data={generalTests} />
    </div>
  );
}

function PatientTable({ data }) {
  const [testQuery, setTestQuery] = useState('');

  const TestsData = data.tests;
  const filteredRequest = TestsData.filter(request =>
    [request.testName, request.patientId.name, request.testId]
      .join(' ')
      .toLowerCase()
      .includes(testQuery.toLowerCase())
  );

  return (
    <div>
      <h1>today request</h1>
      <Search
        query={testQuery}
        setQuery={setTestQuery}
        placeholder="Search Test..."
      />
      <div className="test-table">
        <table>
          <thead>
            <tr>
              <th>Test Request</th>
              <th>Patient Name</th>
              <th>Test Id</th>
              <th>status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="table-animate">
            {filteredRequest.length > 0 ? (
              filteredRequest.map(pTest => (
                <tr key={pTest._id}>
                  <td>{pTest.testName}</td>
                  <td>{pTest.patientId.name}</td>
                  <td>{pTest.testId}</td>
                  <td>{pTest.status}</td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() =>
                        (window.location.href = `/test/${pTest._id}`)
                      }
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="not-found">No Request found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="title float-end">
        <h3></h3>
        <a href="/%Lab%Admin%/Patients" className="patient-view-all">
          General Request <FontAwesomeIcon icon={faArrowRight} />
        </a>
      </div>
    </div>
  );
}
