'use client';
import AddNewTest from '../../../component/AddNewTest';
import PatientPage from '../../../component/PatientPage';
import { useApp } from '../../context/appContext';

export default function SinglePatientPage() {
  const { currentUser, createPatient, setCreatePatient, isLoaded, loading } =
    useApp();

  return (
    <>
      {createPatient && (
        <AddNewTest setModel={setCreatePatient} currentUser={currentUser} />
      )}
      <PatientPage openModel={createPatient} setModel={setCreatePatient} />
    </>
  );
}
