'use client';
import WelcomeCard from './WelcomeCard';
import Stat from './Stat';

import RecentPatients from './RecentPatients';
import '../styles/AdminDashbord.css';

import { useApp } from '../app/context/appContext';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHospitalUser,
  faUser,
  faUserDoctor,
} from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../axiosInstance';
import { faGitlab } from '@fortawesome/free-brands-svg-icons';
import { faHospitalWide } from '@fortawesome/free-regular-svg-icons';
import LineChartTests from '../charts/LineChartTests';
import BarChartRevenue from '../charts/BarChartRevenue';
import RecentTests from './RecentTest';
import ActivityLog from './ActivityLog';

export default function AdminDashbord() {
  const { currentUser, isLoaded, loading, isOpen } = useApp();
  const [fetchLoaded, setFetchLoaded] = useState(false);
  const [generalPatients, setGeneralPatients] = useState();
  const [generalTests, setGeneralTests] = useState();
  const layoutstyle = {
    paddingLeft: isOpen ? '105px' : '220px',
  };

  useEffect(() => {
    const fetchResults = async () => {
      const labId = JSON.parse(localStorage.getItem('LabId'));
      console.log('labid', labId);
      try {
        if (labId) {
          const res = await axiosInstance.get(`/labs/${labId}/patients`);
          const response = await axiosInstance.get(`/labs/${labId}/tests`);
          setGeneralPatients(res.data);
          setGeneralTests(response.data);
          console.log('p', res.data);
          console.log('t', response.data);
          if (res.data || response.data) setFetchLoaded(true);
        }
      } catch (err) {
        console.error(err);
        setFetchLoaded(true);
      }
    };
    fetchResults();
  }, []);
  if (!fetchLoaded) return <div>loading...</div>;
  const num = 12;
  const patientsStat = {
    className: 'div2',
    icon: <FontAwesomeIcon icon={faUser} />,
    title: 'patients Registered',
    text: `${num} new patient registered`,
    num: generalPatients?.patients.length,
    url: 'kamal',
    color1: 'lightgreen',
    color2: 'darkgreen',
  };
  const testsStat = {
    className: 'div3',
    icon: <FontAwesomeIcon icon={faHospitalUser} />,
    title: 'Total Tests',
    text: 'view tests lists',
    num: generalTests?.tests.length,
    url: 'kamal',
    color1: 'lightpink',
    color2: 'maroon',
  };
  const staffsStat = {
    className: 'div4',
    icon: <FontAwesomeIcon icon={faUserDoctor} />,
    title: 'Staffs',
    text: 'manage staffs activities',
    num: generalPatients?.patients.length,
    url: 'kamal',
    color1: 'lightgreen',
    color2: 'darkgreen',
  };
  if (!isLoaded || loading || !fetchLoaded) {
    return <p>Loading profile...</p>;
  }
  console.log(currentUser);

  if (isLoaded && !loading && !currentUser && !fetchLoaded) {
    // window.location.href = "/";
    return null;
  }
  const LineChartData = [
    { name: 'Mon', Requests: 20, completed: 18, pending: 2 },
    { name: 'Teu', Requests: 34, completed: 30, pending: 4 },
    { name: 'Wed', Requests: 80, completed: 19, pending: 7 },
    { name: 'Thu', Requests: 27, completed: 27, pending: 0 },
    { name: 'Fri', Requests: 66, completed: 50, pending: 16 },
    { name: 'Sat', Requests: 12, completed: 10, pending: 2 },
    { name: 'Sun', Requests: 100, completed: 90, pending: 10 },
  ];
  const BarRevenueData = [
    { day: 'Mon', Revenue: 20000, expensices: 10000, Profits: 10000 },
    { day: 'Teu', Revenue: 34000, expensices: 30000, Profits: 4000 },
    { day: 'Wed', Revenue: 80000, expensices: 1900, Profits: 7000 },
    { day: 'Thu', Revenue: 27000, expensices: 2700, Profits: 2000 },
    { day: 'Fri', Revenue: 6600, expensices: 5000, Profits: 16000 },
    { day: 'Sat', Revenue: 1200, expensices: 7000, Profits: 200 },
    { day: 'Sun', Revenue: 10000, expensices: 50000, Profits: 1000 },
  ];
  return (
    <div>
      <h1 className="dash-head" style={layoutstyle}>
        {currentUser.role === 'admin' ? 'lab manager' : ''} (
        {currentUser.labId.name})
      </h1>
      <div className="parent" style={layoutstyle}>
        <WelcomeCard />
        <Stat data={patientsStat} />
        <Stat data={testsStat} />
        <Stat data={staffsStat} />

        <LineChartTests data={LineChartData} />
        <BarChartRevenue data={BarRevenueData} />

        <ActivityLog />

        <RecentPatients
          generalPatients={generalPatients}
          fetchLoaded={fetchLoaded}
        />
        <RecentTests generalTests={generalTests} fetchLoaded={fetchLoaded} />
      </div>
    </div>
  );
}
