'use client';
import { useState } from 'react';
import '../styles/Login.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axiosInstance from '../axiosInstance';
import PasswordInput from './PasswordInput';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');

  const handlePhoneNumber = (value, country) => {
    const countryCode = country.dialCode;
    let cleanedValue = value;

    const pattern = new RegExp(`^${countryCode}0`);
    if (pattern.test(value)) {
      cleanedValue = countryCode + value.slice(countryCode.length + 1);
    }

    const nationalNumber = cleanedValue.slice(countryCode.length);
    if (nationalNumber.length < 8 || nationalNumber.length > 12) {
      setError(`Invalid number length for ${country.name}`);
    } else {
      setError('');
    }

    if (!error) setPhone(cleanedValue);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!phone || !password) {
      alert('Please enter phone and password');
      return;
    }

    if (password.length < 6 || password[0] === password[0].toLowerCase()) {
      alert(
        'Password must be at least 6 characters, starting with a capital letter'
      );
      return;
    }

    try {
      const res = await axiosInstance.post('/patients/login', {
        phone,
        password,
      });

      localStorage.setItem('patientToken', res.data.token);
      localStorage.setItem('patientId', JSON.stringify(res.data.patient.id));

      // Reload page
      window.location.href = '/';
    } catch (err) {
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert('Login failed. Please check your credentials.');
      }
    }
  };

  return (
    <form className="form_container" onSubmit={handleSubmit}>
      <div className="logo_container">
        <img src="./LabUniteLogo.png" alt="logo" style={{ width: '80px' }} />
      </div>

      <div className="title_container">
        <p className="title">Login to your Account</p>
        <span className="subtitle">
          Get started with our app, just create an account and enjoy the
          experience.
        </span>
      </div>

      <br />

      <div className="input_container">
        <label className="input_label">Phone Number</label>

        <PhoneInput
          country={'ng'}
          regions={['africa']}
          onChange={handlePhoneNumber}
          inputProps={{ required: true }}
          inputClass="input_field"
          inputStyle={{ width: '100%', height: '40px' }}
        />
      </div>

      <PasswordInput password={password} setPassword={setPassword}>
        Password
      </PasswordInput>

      <button title="Sign In" type="submit" className="sign-in_btn">
        <span>Sign In</span>
      </button>

      <div className="separator">
        <hr className="line" />
        <span>Or</span>
        <hr className="line" />
      </div>

      {/* IMPORTANT FIX: not submit */}
      <button title="forget password" type="button" className="sign-in_ggl">
        <span>Forget password</span>
      </button>

      <p className="note">Terms of use & Conditions</p>
    </form>
  );
}
