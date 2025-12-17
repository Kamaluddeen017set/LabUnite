import Slider from './Slider';
import Navber from './Navber';
import Hero from './Hero';
import TestHistoryTable from './TestHistoryTable';
import Footer from './Footer';
import AddPatientForm from './AddPatientForm';
import { useApp } from '../app/context/appContext';
import { useState } from 'react';
export default function StaffDashboud() {
  const [generalPatients, setGeneralPatients] = useState({});
  const { createPatient } = useApp();
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
