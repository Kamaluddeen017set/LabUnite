import ProfileImage from './ProfileImage';
import { useApp } from '../app/context/appContext';
export default function Navber() {
  const { currentPatient, isOpen, profileImage } = useApp();
  const patient = currentPatient;

  const layoutstyle = {
    width: isOpen ? '89.6%' : '82.6%',
    marginLeft: isOpen ? '7%' : ' 14%',
  };
  return (
    <div className="nav" style={layoutstyle}>
      <WelcomeMessage patient={patient} key={patient._Id} />
      <Icons
        patient={patient}
        key={patient.labId}
        profileImage={profileImage}
      />
    </div>
  );
}

function Icons({ patient, profileImage }) {
  return (
    <div className="icons">
      <Notification />
      <h6
        style={{
          fontSize: '1rem',
          textTransform: 'uppercase',
          fontFamily: 'poppins',
          color: '#444',
          marginTop: '15px',
        }}
      >
        {patient.name.split(' ')[0]}
      </h6>
      <ProfileImage
        profileImage={profileImage}
        className1="profile"
        className2="profile-image"
      ></ProfileImage>
    </div>
  );
}

function Notification() {
  return (
    <div>
      <button>🔔</button>
    </div>
  );
}

function WelcomeMessage({ patient }) {
  return (
    <div className="welcome-message">
      <h1>Patient | Dashbourd</h1>
      <h3>Welcome back {patient.name}!</h3>
    </div>
  );
}
