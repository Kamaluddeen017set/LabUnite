'use client';
import { useState, useContext, createContext, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [createPatient, setCreatePatient] = useState(false);
  const [profileImage, setProfileImage] = useState('./kamalprofileImage.jpg');
  const [isLoaded, setIsLoaded] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const strongUserToken = localStorage.getItem('userToken');
    setToken(strongUserToken);
  }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userId = JSON.parse(localStorage.getItem('userId'));
        if (!userId) {
          setIsLoaded(true);
          return;
        }

        const res = await axiosInstance.get(`/users/${userId}`);
        if (
          res.data.role === 'lab_technician' ||
          res.data.role === 'lab_scientist' ||
          res.data.role === 'receptionist'
        ) {
          setCurrentUser(res.data);
          const date = new Date();

          localStorage.setItem('lastUpdate', date);
        } else {
          alert('invalid user');
        }
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
        setCreatePatient,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
