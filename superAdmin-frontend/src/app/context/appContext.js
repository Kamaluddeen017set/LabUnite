'use client';
import { useState, useContext, createContext, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [createPatient, setCreatePatient] = useState(false);
  const [createStaff, setCreateStaff] = useState(false);
  const [createLab, setCreateLab] = useState(false);
  const [profileImage, setProfileImage] = useState('../kamalprofileImage.jpg');
  const [isLoaded, setIsLoaded] = useState(false);
  const [token, setToken] = useState(null);
  const [fetchLoaded, setFetchLoaded] = useState(false);
  const [generalPatients, setGeneralPatients] = useState([]);
  const [generalTests, setGeneralTests] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeDay, setActiveDay] = useState(new Date().getDate());

  useEffect(() => {
    const adminStrongToken =
      localStorage.getItem('LabAdminStrongToken') ||
      localStorage.getItem('SuperAdminStrongToken');

    if (adminStrongToken) {
      setToken(adminStrongToken);
    }
  }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        const role = localStorage.getItem('role');

        // SUPER ADMIN: No DB lookup needed
        if (role === 'CEO') {
          setCurrentUser({
            name: process.env.NEXT_PUBLIC_SUPER_ADMIN_NAME || 'CEO',
            role: 'CEO',
          });

          setLoading(false);
          setIsLoaded(true);
          return;
        }

        // NORMAL ADMIN
        const adminUserId = JSON.parse(localStorage.getItem('LabAdminId'));

        if (!adminUserId) {
          setIsLoaded(true);
          return;
        }

        const res = await axiosInstance.get(`/users/${adminUserId}`);
        setCurrentUser(res.data);

        localStorage.setItem('lastUpdate', new Date());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setIsLoaded(true);
      }
    }

    fetchUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isOpen,
        setIsOpen,
        currentUser,
        loading,
        isLoaded,
        token,
        profileImage,
        setProfileImage,
        createPatient,
        createStaff,
        setCreateStaff,
        createLab,
        setCreateLab,
        setCreatePatient,
        generalPatients,
        generalTests,
        fetchLoaded,
        currentDate,
        setCurrentDate,
        activeDay,
        setActiveDay,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
