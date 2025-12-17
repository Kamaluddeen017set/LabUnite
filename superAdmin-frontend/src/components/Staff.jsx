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
  faUserDoctor,
} from '@fortawesome/free-solid-svg-icons';
export default function Patients() {
  const [generalStaffs, setGeneralStaffs] = useState([]);
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
        const res = await axiosInstance.get(`/labs/${labId}/staffs`);
        setGeneralStaffs(res.data);
        console.log('staff', res.data);
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
      <PatientTable data={generalStaffs} />
    </div>
  );
}

function PatientTable({ data }) {
  const [query, setQuery] = useState('');
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const labStaff = data.staffs.filter(staff => staff.role !== 'admin');
  const filtered = labStaff.filter(staff =>
    [staff.name, staff.phone, staff.email, staff.staffId, staff.role]
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
    <div className="general-staff">
      <h1>Staffs</h1>
      <div className="option">
        <Search
          query={query}
          setQuery={setQuery}
          placeholder="Search Staff..."
        />
        <button className="add-staff">
          <FontAwesomeIcon icon={faPlus} /> Add Staff
        </button>
      </div>

      <div className="general-staff-table">
        <table>
          <thead>
            <tr className="table-head">
              <th>
                Name <FontAwesomeIcon icon={faArrowUp} />
              </th>
              <th>Role</th>
              <th>Staff ID</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="table-animate">
            {paginatedData.length > 0 ? (
              paginatedData.slice().map(staff => (
                <tr key={staff._id} className="table-row">
                  <td className="staff-cell">
                    <div className="avatar">
                      <FontAwesomeIcon icon={faUserDoctor} />
                    </div>
                    <span>{staff.name}</span>
                  </td>
                  <td>
                    {staff.role === 'lab_technician'
                      ? 'Technician'
                      : 'Scientist'}
                  </td>
                  <td>{staff.staffId || 'AD-S0205'}</td>
                  <td>{staff.gender}</td>
                  <td>{staff.address || '-'}</td>
                  <td>{staff.phone || '-'}</td>
                  <td>{staff.email}</td>
                  <td>
                    <span
                      className={`status ${
                        staff.activess ? 'Active' : 'inactive'
                      }`}
                    >
                      {staff.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>

                  <td>
                    <button
                      className="view-btn"
                      onClick={() =>
                        (window.location.href = `/patient/${staff._id}`)
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
                  staff not found
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
