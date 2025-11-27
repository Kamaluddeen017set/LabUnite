'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false); // ⭐ NEW
  const [profileImage, setProfileImage] = useState('./kamalprofileImage.jpg');

  useEffect(() => {
    const storedToken = localStorage.getItem('patientToken');
    setToken(storedToken);
  }, []);

  useEffect(() => {
    async function fetchPatient() {
      try {
        const patientId = JSON.parse(localStorage.getItem('patientId'));
        if (!patientId) {
          setIsLoaded(true);
          return;
        }

        const res = await axiosInstance.get(`/patients/${patientId}`);
        setCurrentPatient(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setIsLoaded(true); // ⭐ finish loading
      }
    }

    fetchPatient();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isOpen,
        setIsOpen,
        currentPatient,
        loading,
        isLoaded, // ⭐ expose
        token,
        profileImage,
        setProfileImage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
