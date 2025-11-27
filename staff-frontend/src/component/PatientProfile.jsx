'use client';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

import '../styles/PatientPage.css';
import Link from 'next/link';

export default function PatientProfile({ patientDetails, path, navigateTo }) {
  const [isTyping, setIsTyping] = useState(false);
  const [updatePatient, setUpdatePatient] = useState({
    name: patientDetails.name,
    phone: patientDetails.phone,
    address: patientDetails.address,
    age: patientDetails.age,
    gender: patientDetails.gender,
  });

  return (
    <div className="patient-info-card">
      <Link href={path} className="back-home-btn">
        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
        {navigateTo}
      </Link>

      <div className="patient-photo">
        <img src="../munirat.jpg" alt="Patient" />
      </div>

      <h2 className="patient-name">{patientDetails.name}</h2>

      <div className="info-grid">
        <div>
          <p className="label">Patient ID</p>
          <p className="value">{patientDetails.patientId}</p>
        </div>

        <div>
          <p className="label">Age</p>
          <p className="value">{patientDetails.age}</p>
        </div>

        <div>
          <p className="label">Gender</p>
          <p className="value">{patientDetails.gender}</p>
        </div>

        <div>
          <p className="label">Phone</p>
          <p className="value">{patientDetails.phone}</p>
        </div>
      </div>
    </div>
  );
}
