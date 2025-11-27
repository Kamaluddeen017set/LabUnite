'use client';
import { useApp } from './context/appContext';
import Login from '../component/Login';
import Navber from '../component/Navber';
import Hero from '../component/Hero';
import TestHistoryTable from '../component/TestHistoryTable';
import Footer from '../component/Footer';
import Slider from '../component/Slider';

export default function Home() {
  const { loading, currentPatient, token, isLoaded } = useApp();

  if (!isLoaded) return <p>Loading...</p>; // ⭐ Wait for fetch to complete

  if (!currentPatient || !token) {
    return <Login />;
  }

  return (
    <>
      <Slider />
      <Navber />
      <Hero />
      <TestHistoryTable />
      <Footer />
    </>
  );
}
