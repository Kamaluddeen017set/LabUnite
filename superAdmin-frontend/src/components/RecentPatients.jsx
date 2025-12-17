import { useState } from 'react';
import Search from './Search';
import '../styles/TablesStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowUp } from '@fortawesome/free-solid-svg-icons';
export default function RecentPatient({ generalPatients, fetchLoaded }) {
  if (!fetchLoaded) return <div>loading...</div>;
  return (
    <div className="div8">
      <PatientTable data={generalPatients} />
    </div>
  );
}

function PatientTable({ data }) {
  const [query, setQuery] = useState('');
  const filtered = data.patients.filter(patient =>
    [patient.name, patient.phone, patient.patientId]
      .join(' ')
      .toLowerCase()
      .includes(query.toLowerCase())
  );
  return (
    <>
      <h1>today patient</h1>

      <Search
        query={query}
        setQuery={setQuery}
        placeholder="Search Patient..."
      />

      <div className="patient-table">
        <table>
          <thead>
            <tr>
              <th>
                Name <FontAwesomeIcon icon={faArrowUp} />
              </th>
              <th>PID</th>
              <th>phone</th>
              <th>gender</th>
              <th>age</th>
              <th>address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="table-animate">
            {filtered.length > 0 ? (
              filtered.map(patient => (
                <tr key={patient.patientId}>
                  <td className="patient-cell">
                    <div className="name-avatar">{patient.name.charAt(0)}</div>
                    <span>{patient.name}</span>
                  </td>
                  <td>{patient.patientId}</td>
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
                        View
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
      <div className="title">
        <h3></h3>
        <a href="/%Lab%Admin%/Patients" className="patient-view-all">
          General Patient <FontAwesomeIcon icon={faArrowRight} />
        </a>
      </div>
    </>
  );
}
