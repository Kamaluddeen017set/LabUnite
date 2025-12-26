import { useEffect, useState } from 'react';
import { useApp } from '../app/context/appContext';
import '../styles/StaffDetails.css';
import axiosInstance from '../axiosInstance';
import { useParams } from 'next/navigation';
import StaffDetailLayout from './StaffDetailLayout';
export default function StaffDetails() {
  const [staffDetails, setStaffDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen } = useApp();
  const layoutstyle = {
    paddingLeft: isOpen ? '105px' : '220px',
  };
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/users/${id}`);

        setStaffDetails(res.data);
        console.log('useeeer', res.data);
        setIsLoading(false);
      } catch (err) {
        alert(err.data?.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="main-card" style={layoutstyle}>
      <StaffDetailLayout staffDetails={staffDetails} />
    </div>
  );
}
