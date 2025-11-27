'use client';
import PhoneInput from 'react-phone-input-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-phone-input-2/lib/style.css';
import '../styles/AddPatientForm.css';
import { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useApp } from '../app/context/appContext';

export default function AddPatientForm() {
  const { currentUser, setCreatePatient } = useApp();
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    phone: '',
    age: '',
    address: '',
    gender: '',
  });

  const handleChange = e => {
    setPatientDetails({
      ...patientDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const details = {
      name: patientDetails.name,
      phone: patientDetails.phone,
      gender: patientDetails.gender,
      age: patientDetails.age,
      address: patientDetails.address,
      labId: currentUser.labId._id,
      staffId: currentUser._id,
      password: 'Newpatient',
    };
    try {
      if (!details.phone || !details.gender || !details.name)
        return alert('all field are required');

      const res = await axiosInstance.post('/patients/register', details);
      alert(res.data.message);
      setCreatePatient(false);
      window.location.href = '/';
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to register');
    }
  };

  return (
    <div className="add-patient-form">
      <div className="create-menu">
        <FontAwesomeIcon
          icon={faTimesCircle}
          onClick={() => setCreatePatient(false)}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Enter Patient Details</h3>
        <label className="input_label" htmlFor="email_field">
          Phone Number
        </label>
        <PhoneInput
          country={'ng'}
          value={patientDetails.phone}
          onChange={value =>
            setPatientDetails({ ...patientDetails, phone: value })
          }
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
        <br />
        <label className="input_label" htmlFor="name">
          Patient Name
        </label>
        <input
          type="text"
          placeholder=" Full name"
          name="name"
          className="combobox-input"
          value={patientDetails.name}
          onChange={handleChange}
        />
        <br /> <br />
        <div className="age-gender">
          <label className="input_label" htmlFor="name">
            Age:
          </label>
          <input
            type="text"
            placeholder="Enter age"
            className="combobox-input"
            style={{ width: '20%' }}
            maxLength={5}
            value={patientDetails.age}
            name="age"
            onChange={handleChange}
          />
          <label className="input_label" htmlFor="name">
            Gender:
          </label>
          <select
            className="input_label"
            value={patientDetails.gender}
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
            value={patientDetails.address}
            onChange={handleChange}
          />
        </div>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
