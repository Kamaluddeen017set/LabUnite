'use client';
import PhoneInput from 'react-phone-input-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-phone-input-2/lib/style.css';
import '../styles/AddPatientForm.css';
import { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useApp } from '../app/context/appContext';

export default function AddStaff() {
  const { currentUser, setCreateStaff } = useApp();
  const [staffDetails, setStaffDetails] = useState({
    name: '',
    phone: '',
    email: '',
    dateOfBath: '',
    address: '',
    gender: '',
    role: '',
  });

  const handleChange = e => {
    setStaffDetails({
      ...staffDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const details = {
      name: staffDetails.name,
      email: staffDetails.email.toLowerCase(),
      dateOfBath: staffDetails.dateOfBath,
      phone: staffDetails.phone,
      gender: staffDetails.gender,
      address: staffDetails.address,
      role: staffDetails.role,
      labId: currentUser.labId._id,
      staffId: currentUser._id,
      password: 'K1234567',
    };
    try {
      if (
        !details.email ||
        !details.gender ||
        !details.name ||
        !details.dateOfBath
      )
        return alert('all field are required');
      if (details.role.length < 3) return alert('Role field is needed');
      const res = await axiosInstance.post('/users/register', details);
      alert(res.data.message);
      setCreateStaff(false);
      window.location.href = '/%Lab%Admin%/Staffs';
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to register');
    }
  };

  return (
    <div className="add-staff-form">
      <div className="create-menu">
        <FontAwesomeIcon
          icon={faTimesCircle}
          onClick={() => setCreateStaff(false)}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Enter Staff Details</h3>
        <label className="input_label" htmlFor="name">
          Staff Name
        </label>
        <input
          type="text"
          placeholder=" Full name"
          name="name"
          className="combobox-input"
          value={staffDetails.name}
          onChange={handleChange}
        />
        <br />
        <label className="input_label" htmlFor="email_field">
          Email
        </label>
        <input
          type="text"
          placeholder=" email address"
          name="email"
          className="combobox-input"
          value={staffDetails.email}
          onChange={handleChange}
        />

        <br />
        <label className="input_label" htmlFor="email_field">
          Phone Number
        </label>
        <PhoneInput
          country={'ng'}
          value={staffDetails.phone}
          onChange={value => setStaffDetails({ ...staffDetails, phone: value })}
          regions={['africa']}
          inputProps={{ name: 'phone', required: true, autoFocus: true }}
          type="tel"
          name="number"
          placeholder="Phone number"
          required
          inputClass="combobox-input"
          inputStyle={{
            width: '100%',
            height: '40px',
          }}
        />

        <div className="age-gender">
          <label className="input_label" htmlFor="name">
            Date of Bath:
          </label>
          <input
            type="date"
            className="combobox-input"
            maxLength={5}
            value={staffDetails.dateOfBath}
            name="dateOfBath"
            onChange={handleChange}
          />
          <br />
          <br />
          <label className="input_label" htmlFor="role">
            Role:
          </label>
          <select
            className="input_label"
            value={staffDetails.role}
            onChange={handleChange}
            name="role"
          >
            <option value="">select Role</option>
            <option value="lab_technician">Lab Technician</option>
            <option value="lab_scientist">Lab Scientist</option>
            <option value="receptionist">Receptionist</option>
          </select>
          <label className="input_label" htmlFor="name">
            Gender:
          </label>
          <select
            className="input_label"
            value={staffDetails.gender}
            onChange={handleChange}
            name="gender"
          >
            <option value="">select</option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
          <label className="input_label" htmlFor="name">
            Address:
          </label>
          <input
            type="text"
            placeholder="Address here"
            className="combobox-input"
            style={{ width: '20%' }}
            name="address"
            value={staffDetails.address}
            onChange={handleChange}
          />
        </div>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
