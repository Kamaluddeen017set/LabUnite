'use client';
import React, { useState } from 'react';

import 'react-phone-input-2/lib/style.css';
import ProfileImage from './ProfileImage';
import '../styles/Profile.css';
import axiosInstance from '../axiosInstance';
import PasswordInput from './PasswordInput';
import { useApp } from '../app/context/appContext';
export default function Profile() {
  const { currentUser, loading, profileImage, isLoaded, isOpen } = useApp();
  const [setting, setSetting] = useState(true);
  if (!isLoaded || loading) {
    return <p>Loading profile...</p>;
  }

  // ⭐ If user not logged in, redirect safely
  if (!currentUser) {
    window.location.href = '/';
    return null;
  }
  const user = currentUser;

  return (
    <div
      className="profile-card"
      style={{ marginLeft: isOpen ? '7%' : ' 13%' }}
    >
      <div className="profile-header">
        <div className="left">
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
          <UserTittle user={user} />
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
              {user.labId.name}
            </h3>
            <h3>{user.labId.address}</h3>
          </div>
        </div>
        <div className="right">
          {setting ? (
            <UserDetails user={user} />
          ) : (
            <PasswordSetting user={user} />
          )}
        </div>
      </div>
    </div>
  );
}

function UserTittle({ user }) {
  return (
    <>
      <h1>{user.name}</h1>
      <h2>{user.email}</h2>
    </>
  );
}

function ProfileMenu({ setSetting, setting }) {
  const [active, setActive] = useState('Personal Information');

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
function UserDetails({ user }) {
  const [isTyping, setIsTyping] = useState(false);

  // const [photo, setPhoto] = useState();

  const [upDatedInfo, setUpdatedInfo] = useState({
    name: user.name,
    email: user.email,
    address: user.address,
    gender: user.gender,
  });

  const handleChange = e =>
    setUpdatedInfo({
      ...upDatedInfo,
      [e.target.name]: e.target.value,
    });

  const handleSave = async e => {
    try {
      const res = await axiosInstance.put('/users/update-profile', upDatedInfo);

      alert(res.data.message);
      setIsTyping(false);
    } catch (err) {
      alert(err.response?.data?.message || 'update failed');
      setIsTyping(false);
    }
  };
  return (
    <div className="user-details">
      <ul>
        <li>
          Name:
          <input
            name="name"
            type="text"
            value={upDatedInfo.name}
            disabled={!isTyping}
            placeholder="User name"
            onChange={handleChange}
          />
        </li>
        <li>
          PID: <input value={user._id} disabled />
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
          email:
          <input
            type="email"
            placeholder="email here"
            name="email"
            value={upDatedInfo.email}
            onChange={handleChange}
            disabled={!isTyping}
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

      const res = await axiosInstance.put('/users/update-password', password);

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
