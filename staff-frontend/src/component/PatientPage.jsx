'use client';
import '../styles/PatientPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import axiosInstance from '../axiosInstance';
import { useEffect, useState } from 'react';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import PatientProfile from './PatientProfile';
import { useParams } from 'next/navigation';
import '../styles/TestTable.css';
export default function PatientPage({ openModel, setModel }) {
  const [patientDetails, setPatientDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/patients/${id}`);

        setPatientDetails(res.data);
        setLoading(false);
      } catch (err) {
        alert(err.data?.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  if (loading) return <p>Loading...</p>;

  return (
    <div
      className="patient-page"
      style={{ filter: openModel ? 'blur(20px)' : '' }}
    >
      <PatientProfile
        patientDetails={patientDetails}
        path="/"
        navigateTo="Back to Dashboud"
      />
      <PatientTestSection patientDetails={patientDetails} setModel={setModel} />
    </div>
  );
}

function PatientTestSection({ patientDetails, setModel }) {
  console.log(patientDetails);
  return (
    <div className="test-section">
      <div className="test-header">
        <h2>Patient Tests</h2>
        <button className="add-test-btn" onClick={() => setModel(true)}>
          <FontAwesomeIcon icon={faPlusCircle} /> Add Test
        </button>
      </div>
      <div className="table">
        <table className="test-table">
          <thead>
            <tr>
              <th>Test Id</th>
              <th>Test Name</th>
              <th>Status</th>
              <th>Date</th>
              <th>Result</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {console.log(patientDetails.tests)}
            {patientDetails.tests?.length > 0 ? (
              [...patientDetails.tests.reverse()].map(test => (
                <tr key={test.testId}>
                  <td>{test.testId}</td>
                  <td>{test.testName}</td>
                  <td>
                    <span
                      className={`status- badge${test.status?.toLowerCase()}`}
                    >
                      {test.status}
                    </span>
                  </td>
                  <td>{test.createdAt}</td>
                  <td>{test.result}</td>
                  <td>
                    {test.status === 'pending' && (
                      <button
                        className="view-btn"
                        onClick={() =>
                          (window.location.href = `/test/${test._id}`)
                        }
                      >
                        Upload result
                      </button>
                    )}
                    {test.status === 'completed' && (
                      <button
                        className="view-btn"
                        onClick={() =>
                          (window.location.href = `/test/${test._id}`)
                        }
                        style={{
                          background: 'green',
                        }}
                      >
                        View Result
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No test found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
