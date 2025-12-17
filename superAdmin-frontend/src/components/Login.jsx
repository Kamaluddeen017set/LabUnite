'use client';
import { useEffect, useState } from 'react';
import '../styles/Login.css';

import axiosInstance from '../axiosInstance';
import PasswordInput from './PasswordInput';
import Email from './Email';

export default function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminUser, setAdminUser] = useState('');
  const handleSubmit = async e => {
    e.preventDefault();
    console.log('component loaded');

    const email = userEmail.toLowerCase();

    if (!email.includes('gmail.com')) return alert('Invalid email check again');

    if (!email || !password) {
      alert('Please enter your email and password');
      return;
    }

    if (password.length < 6 || password[0] === password[0].toLowerCase()) {
      alert('Password must be 6+ characters and start with a capital letter');
      return;
    }

    try {
      const res = await axiosInstance.post('/users/login', {
        email,
        password,
      });

      console.log(res);

      const user = res.data.user;
      console.log(user);
      setAdminUser(user);

      if (user.role === 'admin') {
        localStorage.setItem('LabAdminStrongToken', res.data.token);
        localStorage.setItem('LabAdminId', JSON.stringify(user._id));
        localStorage.setItem('LabId', JSON.stringify(user.labId._id));

        localStorage.setItem('role', 'admin');
        window.location.href = '/%Lab%Admin%';
      } else if (user.role === 'superAdmin') {
        localStorage.setItem('SuperAdminStrongToken', res.data.token);
        localStorage.setItem('role', 'CEO');
        window.location.href = '/%Devkhamal%SuperAdmin%';
      } else {
        alert('Invalid user');
        // window.location.href = "/";
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert('Login failed. Please check your credentials.');
      }
    }
  };
  return (
    <form className="form_container">
      <div className="logo_container">
        <img src="./LabUniteLogo.png" alt="logo" style={{ width: '50px' }} />
      </div>

      <div className="title_container">
        <p className="title">Login to your Account</p>
        <span className="subtitle">
          Get started with our app, just create an account and enjoy the
          experience.
        </span>
      </div>
      <br />

      <Email userEmail={userEmail} setUserEmail={setUserEmail} />
      <PasswordInput password={password} setPassword={setPassword}>
        Password
      </PasswordInput>

      <button
        title="Sign In"
        type="submit"
        className="sign-in_btn"
        onClick={handleSubmit}
      >
        <span>Sign In</span>
      </button>
      <div className="separator">
        <hr className="line" />
        <span>Or</span>
        <hr className="line" />
      </div>
      <button title="Sign In" type="submit" className="sign-in_ggl">
        <svg
          height={18}
          width={18}
          viewBox="0 0 32 32"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <path
              d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
              id="A"
            />
          </defs>
          <clipPath id="B"></clipPath>
          <g transform="matrix(.727273 0 0 .727273 -.954545 -1.45455)">
            <path fill="#fbbc05" clipPath="url(#B)" d="M0 37V11l17 13z" />
            <path
              fill="#ea4335"
              clipPath="url(#B)"
              d="M0 11l17 13 7-6.1L48 14V0H0z"
            />
            <path
              fill="#34a853"
              clipPath="url(#B)"
              d="M0 37l30-23 7.9 1L48 0v48H0z"
            />
            <path
              fill="#4285f4"
              clipPath="url(#B)"
              d="M48 48L17 24l-4-3 35-10z"
            />
          </g>
        </svg>
        <span>Sign In with Google</span>
      </button>
      <button title="forget passwoed" type="submit" className="sign-in_ggl">
        <span>Forget password</span>
      </button>

      <p className="note">Terms of use &amp; Conditions</p>
    </form>
  );
}
