'use client';
import { useState, useEffect } from 'react';
import Search from './Search';
import '../styles/TestTable.css';
import axiosInstance from '../axiosInstance';
import { useApp } from '../app/context/appContext';

const TestHistoryTable = function () {
  const { currentUser, createPatient, isOpen } = useApp();
  const [generalPatients, setGeneralPatients] = useState({});
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  const [page, setPage] = useState(0);
  useEffect(() => {
    const fetchResults = async () => {
      const labId = currentUser.labId._id;
      try {
        const res = await axiosInstance.get(`/labs/${labId}/patients`);

        setGeneralPatients(res.data);
        setLoading(false);
        console.log('reesss', res.data);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  if (loading) return <p>Loading...</p>;
  console.log('pppp', generalPatients.patients);
  // const filteredStus = generalPatients.tests.filter(test =>
  //   [test.status].join(' ').toLowerCase().includes(filter.toLowerCase())
  // );

  const filtered = generalPatients.patients.filter(patient =>
    [patient.name, patient.phone, patient.patientId]
      .join(' ')
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const layoutstyle = {
    width: isOpen ? '89.6%' : '84%',
    marginLeft: isOpen ? '7%' : ' 14%',
    filter: createPatient ? 'blur(10px)' : 'none',
  };

  return (
    <div>
      <div className="patient-test-table-container" style={layoutstyle}>
        <h2 className="table-title">Patients List</h2>
        {/* <StatusFilter filter={filter} setFilter={setFilter} /> */}
        <Search query={query} setQuery={setQuery} />
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
                [...filtered.reverse()].map(patient => (
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
                <p className="not-found">test not found</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TestHistoryTable;
