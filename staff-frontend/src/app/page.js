'use client';
import Slider from '../component/Slider';
import Navber from '../component/Navber';
import AddPatientForm from '../component/AddPatientForm';
import Hero from '../component/Hero';
import TestHistoryTable from '../component/TestHistoryTable';
import Footer from '../component/Footer';
import { useApp } from './context/appContext';
import Login from '../component/Login';
import { useState } from 'react';

export default function Home() {
  const { currentUser, createPatient, token, isLoaded } = useApp();
  const [generalPatients, setGeneralPatients] = useState({});
  if (!isLoaded) return <p>Loading...</p>;

  if (!currentUser || !token) {
    return <Login />;
  }

  return (
    <>
      <Slider />
      <Navber />

      {createPatient && <AddPatientForm />}
      <Hero generalPatients={generalPatients} />
      <TestHistoryTable
        setGeneralPatients={setGeneralPatients}
        generalPatients={generalPatients}
      />
      <Footer />
    </>
  );
}
