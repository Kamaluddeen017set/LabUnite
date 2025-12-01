import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useApp } from '../app/context/appContext';
import { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
export default function Hero({ generalPatients }) {
  const [loading, setLoading] = useState(true);
  const [generalTests, setGeneralTests] = useState([]);
  const { currentUser, createPatient, setCreatePatient, isLoaded, isOpen } =
    useApp();
  const user = currentUser;

  const layoutstyle = {
    width: isOpen ? '84.5%' : '100%',
    marginLeft: isOpen ? '10%' : '5.5%',
    filter: createPatient ? 'blur(3px)' : 'none',
  };

  useEffect(() => {
    const fetchResults = async () => {
      const labId = currentUser.labId._id;
      console.log('isddd', labId);
      try {
        const res = await axiosInstance.get(`/labs/${labId}/tests`);

        setGeneralTests(res.data);

        setLoading(false);
        console.log('reesss', res.data);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchResults();
  }, []);
  if (!generalPatients.patients || loading) return <p>loading..</p>;
  return (
    <div className="hero" style={layoutstyle}>
      {console.log('general p', generalPatients)}
      <RecentTest
        generalPatients={generalPatients}
        setCreatePatient={setCreatePatient}
        generalTests={generalTests}
      />
    </div>
  );
}
function RecentTest({ generalPatients, setCreatePatient, generalTests }) {
  console.log('tesssss', generalTests);
  const numOfAllPatients = generalPatients.patients.length;
  const numOfAllTests = generalTests.tests.length;
  const pendingTests = generalTests.tests.filter(
    pending => pending.status === 'pending'
  ).length;

  const date = localStorage.getItem('lastUpdate');

  // const pendingTest = test.filter(
  //   pending => pending.status === 'pending'
  // ).length;

  // const completedTest = test.filter(
  //   completed => completed.status === 'completed'
  // ).length;

  return (
    <div className="recent-test">
      <TestDone className="total-test-done">
        <h2>
          <span>{numOfAllPatients}</span> Total Patients
        </h2>
      </TestDone>
      <TestDone className="pending-test">
        <h2>
          <span>{numOfAllTests}</span> Total Tests
        </h2>
      </TestDone>{' '}
      <TestDone className="pending-test">
        <h2>
          <span>{pendingTests}</span> pending Tests
        </h2>
      </TestDone>
      <TestDone className="last-update-date">
        <button className="view-btn" onClick={() => setCreatePatient(true)}>
          <FontAwesomeIcon icon={faPlusCircle} /> Add Patient
        </button>
      </TestDone>
    </div>
  );
}

function TestDone({ className, children }) {
  return <div className="className">{children}</div>;
}
