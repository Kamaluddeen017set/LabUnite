'use client';
import { useApp } from '../../context/appContext';
import TestEditPage from '../../../component/TestEditPage';
export default function SingleTestPage() {
  const { currentUser, isLoaded, loading } = useApp();

  if (!isLoaded || loading) {
    return <p>Loading profile...</p>;
  }

  // ⭐ If user not logged in, redirect safely
  if (!currentUser) {
    window.location.href = '/';
    return null;
  }

  return (
    <>
      <TestEditPage currentUser={currentUser} />
    </>
  );
}
