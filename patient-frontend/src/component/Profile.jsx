'use client';
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import ProfileImage from './ProfileImage';
import '../styles/Profile.css';
import axiosInstance from '../axiosInstance';
import PasswordInput from './PasswordInput';
import { useApp } from '../app/context/appContext';
export default function Profile() {
  const {
    isOpen,
    currentPatient,
    profileImage,
    setProfileImage,
    isLoaded,
    loading,
  } = useApp();
  const [setting, setSetting] = useState(true);
  // ⭐ Wait until context finishes fetching patient
  if (!isLoaded || loading) {
    return <p>Loading profile...</p>;
  }

  // ⭐ If user not logged in, redirect safely
  if (!currentPatient) {
    window.location.href = '/';
    return null;
  }

  const patient = currentPatient;

  return (
    <div
      className="profile-card"
      style={{ marginLeft: isOpen ? '7%' : ' 13%' }}
    >
      <div className="profile-header">
        <div className="left">
          {' '}
          <div
            style={{
              height: '150px',
              borderRadius: '10px  10px 50px 50px',
              background: 'var(--scolor)',
              boxShadow: 'var(--shadow)',
            }}
          ></div>
          <div
            style={{
              background: 'var(--tcolor)',
              width: '210px',
              height: '201px',
              borderRadius: '50%',
              justifySelf: 'center',
              marginTop: '-30%',
            }}
          ></div>
          <ProfileImage
            profileImage={profileImage}
            className1="profile-div"
            className2="profileCardImage"
          />
          <PatirntTittle patient={patient} />
          <ProfileMenu setSetting={setSetting} setting={setting} />
          <div
            style={{
              height: '100px',
              marginTop: '32%',
              borderRadius: '0  0 10px 10px',
              background: 'var(--scolor)',
              boxShadow: 'var(--shadow)',
              textAlign: 'center',
            }}
          >
            <h2>Laboratory</h2>
            <h3 style={{ color: 'var(--pcolor)', textTransform: 'uppercase' }}>
              {patient.labId.name}
            </h3>
            <h3>{patient.labId.address}</h3>
          </div>
        </div>
        <div className="right">
          {setting ? (
            <PatientDetails patient={patient} />
          ) : (
            <PasswordSetting patient={patient} />
          )}
        </div>
      </div>
    </div>
  );
}

function PatirntTittle({ patient }) {
  return (
    <>
      <h1>{patient.name}</h1>
      <h2>{patient.phone}</h2>
    </>
  );
}

function ProfileMenu({ setSetting, setting }) {
  const [active, setActive] = useState('Personal Information');
  const handleLogOut = () => {
    setActive('Log Out');
    if (window.confirm('Are you sure you want to log out ?')) {
      localStorage.removeItem('patientToken');
      localStorage.removeItem('patientId');
      window.location.href = '/';
    }
  };

  return (
    <div className="profile-menu">
      <ul>
        <ProfileMenuList
          onclicking={e => {
            setSetting(true);
            setActive('Personal Information');
          }}
          active={active}
        >
          Personal Information
        </ProfileMenuList>
        <br />
        <ProfileMenuList
          onclicking={e => {
            setSetting(false);
            setActive('Password Setting');
          }}
          active={active}
        >
          Password Setting
        </ProfileMenuList>

        <br />
        <ProfileMenuList onclicking={handleLogOut} active={active}>
          Log Out
        </ProfileMenuList>
      </ul>
    </div>
  );
}

function ProfileMenuList({ children, onclicking, active }) {
  const activeStyles = {
    border: active === children ? '0.5px solid var(--scolor)' : 'none',
    borderLeft: active === children ? '10px solid var(--scolor)' : 'none',
  };
  return (
    <li>
      <a value="information" href="#" onClick={onclicking} style={activeStyles}>
        {children}
      </a>
    </li>
  );
}
function PatientDetails({ patient }) {
  const [isTyping, setIsTyping] = useState(false);

  // const [photo, setPhoto] = useState();

  const [upDatedInfo, setUpdatedInfo] = useState({
    name: patient.name,
    phone: patient.phone,
    address: patient.address,
    gender: patient.gender,
  });

  const handleChange = e =>
    setUpdatedInfo({
      ...upDatedInfo,
      [e.target.name]: e.target.value,
    });

  const handleSave = async e => {
    try {
      const res = await axiosInstance.put(
        '/patients/update-profile',
        upDatedInfo
      );

      alert(res.data.message);
      setIsTyping(false);
    } catch (err) {
      alert(err.response?.data?.message || 'update failed');
      setIsTyping(false);
    }
  };
  return (
    <div className="patient-details">
      <ul>
        <li>
          Name:
          <input
            name="name"
            type="text"
            value={upDatedInfo.name}
            disabled={!isTyping}
            placeholder="Patient name"
            onChange={handleChange}
          />
        </li>
        <li>
          PID: <input value={patient.patientId} disabled />
        </li>
        <li>
          Address:{' '}
          <input
            name="address"
            type="text"
            value={upDatedInfo.address}
            disabled={!isTyping}
            onChange={handleChange}
          />
        </li>
        <li>
          Phone:
          <PhoneInput
            country={'ng'}
            regions={['africa']}
            type="tel"
            value={upDatedInfo.phone}
            inputStyle={{
              background: '#f8f9ff',
              width: '100%',
              height: '52px',
              borderRadius: '5px',
            }}
            disabled={!isTyping}
            onChange={value => setUpdatedInfo({ ...upDatedInfo, phone: value })}
          />
        </li>
        <li>
          Gender:
          <select
            value={upDatedInfo.gender}
            name="gender"
            className="gender"
            onChange={handleChange}
            disabled={!isTyping}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </li>
        <li>
          change profile image: <input type="file" disabled={!isTyping} />
        </li>
      </ul>
      {isTyping ? (
        <button type="submit" className="edit-profile" onClick={handleSave}>
          Save Change
        </button>
      ) : (
        <button
          type="button"
          className="edit-profile"
          onClick={() => setIsTyping(!isTyping)}
        >
          Edit Profile
        </button>
      )}
    </div>
  );
}
function PasswordSetting() {
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOnSubmit = async e => {
    e.preventDefault();

    try {
      if (confirmPassword !== password.newPassword)
        return alert('password not march');

      const res = await axiosInstance.put(
        '/patients/update-password',
        password
      );

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'password update failed');
    }
  };
  return (
    <form className="password-setting" onSubmit={handleOnSubmit}>
      <h2>change your password</h2>

      <PasswordInput
        setPassword={setPassword}
        name="currentPassword"
        change={password}
      >
        current password:
      </PasswordInput>

      <PasswordInput
        setPassword={setPassword}
        name="newPassword"
        change={password}
      >
        New password:
      </PasswordInput>

      <PasswordInput
        password={confirmPassword}
        setPassword={setConfirmPassword}
      >
        confirm password:
      </PasswordInput>
      <button className="set-btn">change password</button>
    </form>
  );
}
