'use client';

import StaffDashboud from '../component/StaffDashboud';
import { useApp } from './context/appContext';
import Login from '../component/Login';

export default function Home() {
  const { currentUser, createPatient, token, isLoaded } = useApp();

  if (!isLoaded) return <p>Loading...</p>;

  if (!currentUser || !token) {
    return <Login />;
  }
  if (
    currentUser.role === 'lab_technician' ||
    currentUser.role === 'lab_scientist' ||
    currentUser.role === 'receptionist'
  ) {
    return <StaffDashboud />;
  } else {
    return <Login />;
  }
}
