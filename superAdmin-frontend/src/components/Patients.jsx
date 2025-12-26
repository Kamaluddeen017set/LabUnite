'use client';
import { useApp } from '../app/context/appContext';

import { useEffect, useState } from 'react';
import Search from './Search';
import '../styles/Patients.css';
import axiosInstance from '../axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faOptinMonster } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowUp,
  faChevronLeft,
  faChevronRight,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import AddPatientForm from './AddPatientForm';
export default function Patients() {
  const [generalPatients, setGeneralPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, setCreatePatient, createPatient } = useApp();
  const layoutstyle = {
    paddingLeft: isOpen ? '80px' : '200px',
    paddingTop: '60px',
  };

  useEffect(() => {
    const fetchResults = async () => {
      const labId = JSON.parse(localStorage.getItem('LabId'));
      try {
        const res = await axiosInstance.get(`/labs/${labId}/patients`);
        setGeneralPatients(res.data);
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
      {createPatient && <AddPatientForm />}
      <PatientTable
        data={generalPatients}
        setCreatePatient={setCreatePatient}
        createPatient={createPatient}
      />
    </div>
  );
}

function PatientTable({ data, setCreatePatient, createPatient }) {
  const [query, setQuery] = useState('');
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = data.patients.filter(patient =>
    [patient.name, patient.phone, patient.patientId]
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

  return (
    <div
      className="general-patients"
      style={{ filter: createPatient ? 'blur(10px)' : 'none' }}
    >
      <h1>Patients</h1>
      <div className="option">
        <Search
          query={query}
          setQuery={setQuery}
          placeholder="Search Patient..."
        />
        <button className="add-patient" onClick={() => setCreatePatient(true)}>
          <FontAwesomeIcon icon={faPlus} /> Add Patient
        </button>
      </div>

      <div className="general-patient-table">
        <table>
          <thead>
            <tr className="table-head">
              <th>
                Name <FontAwesomeIcon icon={faArrowUp} />
              </th>
              <th>Patient ID</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="table-animate">
            {paginatedData.length > 0 ? (
              paginatedData.slice().map(patient => (
                <tr key={patient.patientId} className="table-row">
                  <td className="patient-cell">
                    <div className="avatar">{patient.name.charAt(0)}</div>
                    <span>{patient.name}</span>
                  </td>

                  <td>{patient.patientId}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.age}</td>
                  <td>{patient.phone}</td>

                  <td>
                    <span
                      className={`status ${
                        patient.active ? 'Active' : 'inactive'
                      }`}
                    >
                      {patient.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>

                  <td>
                    <button
                      className="view-btn"
                      onClick={() =>
                        (window.location.href = `/patient/${patient._id}`)
                      }
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="not-found">
                  Patient not found
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
