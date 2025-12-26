import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/Stat.css';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useApp } from '../app/context/appContext';
import axiosInstance from '../axiosInstance';

export default function Stats({ data, staffDetails }) {
  const [patientNum, setpatientNum] = useState([]);
  const [testNum, setTestNum] = useState([]);
  const [staffNum, setStaffNum] = useState([]);
  const [loading, setLoading] = useState(true);
  let num;
  let patientAddByStaff = [];
  let requestAddByStaff = [];
  const { activeDay, currentDate, currentUser } = useApp();
  useEffect(() => {
    const fetchResults = async () => {
      const labId = JSON.parse(localStorage.getItem('LabId'));
      if (!labId) return;
      try {
        const res = await axiosInstance.get(`/labs/${labId}/patients`);
        const response = await axiosInstance.get(`/labs/${labId}/tests`);
        const ress = await axiosInstance.get(`/labs/${labId}/staffs`);
        setpatientNum(res.data);
        setTestNum(response.data);
        setStaffNum(ress.data);

        if (res.data || response.data) setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchResults();
  }, [activeDay, currentDate]);

  if (staffDetails && !loading) {
    patientAddByStaff = patientNum.patients.filter(
      patient => patient.staffId._id === staffDetails._id
    );
    requestAddByStaff = testNum.tests.filter(
      test => test.staffId._id === staffDetails._id
    );
  }
  console.log('ssssss', patientAddByStaff);
  if (loading) return <p>Loading...</p>;
  if (data.title === 'Patients Registered' && staffDetails) {
    num = patientAddByStaff.length;
  } else if (data.title === 'Patients Registered') {
    num = patientNum.patients.length;
  } else if (data.title === 'Total Tests') {
    num = testNum.tests.length;
  } else if (data.title === 'Test Added') {
    num = requestAddByStaff.length;
  } else {
    num = staffNum.staffs.length;
  }
  return (
    <div className={`${data.className} stats`}>
      <div
        className="Icons"
        style={{ background: data.color1, color: data.color2 }}
      >
        {data.icon}
      </div>
      <h3>{data.title}</h3>
      <div className="numtext">
        <span>{num}</span>
        <a href={data.url}>
          {data.text} <FontAwesomeIcon icon={faArrowRight} />
        </a>
      </div>
    </div>
  );
}
