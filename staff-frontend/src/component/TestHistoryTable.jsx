'use client';
import { useState, useEffect } from 'react';
import Search from './Search';
import '../styles/TestTable.css';
import axiosInstance from '../axiosInstance';
import { useApp } from '../app/context/appContext';

const TestHistoryTable = function ({ setGeneralPatients, generalPatients }) {
  const { currentUser, createPatient, isOpen } = useApp();
  const [generalTest, setGeneralTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      const labId = currentUser.labId._id;
      try {
        const res = await axiosInstance.get(`/labs/${labId}/patients`);
        const response = await axiosInstance.get(`/labs/${labId}/tests`);
        setGeneralPatients(res.data);
        setGeneralTests(response.data);
        if (res.data || response.data) setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  if (loading) return <p>Loading...</p>;
  console.log('tttt', generalTest);

  const layoutstyle = {
    width: isOpen ? '89.6%' : '55%',
    marginLeft: isOpen ? '7%' : ' 14%',
    filter: createPatient ? 'blur(10px)' : 'none',
  };
  const filtered = generalPatients.patients.filter(patient =>
    [patient.name, patient.phone, patient.patientId]
      .join(' ')
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="layout">
      <GeneralPatients
        query={query}
        setQuery={setQuery}
        layoutstyle={layoutstyle}
        filtered={filtered}
      />
      <GeneralLabTest generalTest={generalTest} />
    </div>
  );
};

function GeneralPatients({ query, setQuery, layoutstyle, filtered }) {
  return (
    <div className="patient-test-table-container" style={layoutstyle}>
      <h2 className="table-title"> General Patients </h2>

      <Search
        query={query}
        setQuery={setQuery}
        placeholder=" Name, Phone Or PID"
      />
      <div className="table-wrapper">
        <table className="patient-test-table">
          <thead>
            <tr>
              <th>patient Id</th>
              <th>patient Name</th>
              <th>patient phone</th>
              <th>gender</th>
              <th>age</th>
              <th>address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="table-animate">
            {filtered.length > 0 ? (
              filtered
                .reduce((acc, curr) => [curr, ...acc], [])
                .map(patient => (
                  <tr key={patient.patientId}>
                    <td>{patient.patientId}</td>
                    <td>{patient.name}</td>
                    <td>{patient.phone}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.age}</td>
                    <td>{patient.address}</td>

                    <td>
                      {
                        <button
                          className="view-btn"
                          onClick={() =>
                            (window.location.href = `/patient/${patient._id}`)
                          }
                        >
                          Patient Details
                        </button>
                      }
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td className="not-found">Patient not found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GeneralLabTest({ generalTest }) {
  const [testQuery, setTestQuery] = useState('');

  const pendingTests = generalTest.tests.filter(t => t.status === 'pending');
  const filteredRequest = pendingTests.filter(request =>
    [request.testName, request.patientId.name, request.testId]
      .join(' ')
      .toLowerCase()
      .includes(testQuery.toLowerCase())
  );

  return (
    <div className="test-list">
      <h2 className="table-title">General Request </h2>
      <Search
        query={testQuery}
        setQuery={setTestQuery}
        placeholder="Test Or Name"
      />
      <div className="table-wrapper">
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
              filteredRequest
                .reduce((acc, curr) => [curr, ...acc], [])
                .map(pTest => (
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
                        Enroll
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
    </div>
  );
}
export default TestHistoryTable;
