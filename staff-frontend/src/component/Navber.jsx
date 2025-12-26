'use client';
import ProfileImage from './ProfileImage';
import { useApp } from '../app/context/appContext';
export default function Navber() {
  const {
    currentUser,
    loading,
    createPatient,
    isLoaded,
    isOpen,
    profileImage,
  } = useApp();
  if (!isLoaded || loading) {
    return <p>Loading profile...</p>;
  }

  // ⭐ If user not logged in, redirect safely
  if (!currentUser) {
    window.location.href = '/';
    return null;
  }
  const user = currentUser;

  const layoutstyle = {
    width: isOpen ? '89.6%' : '82.6%',
    marginLeft: isOpen ? '7%' : ' 14%',
    filter: createPatient ? 'blur(10px)' : 'none',
  };
  return (
    <div className="nav" style={layoutstyle}>
      <WelcomeMessage user={user} key={user._Id} />
      <Icons user={user} key={user.labId} profileImage={profileImage} />
    </div>
  );
}

function Icons({ user, profileImage }) {
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
        {user.name.split(' ')[0]}
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

function WelcomeMessage({ user }) {
  let role;
  if (user.role.startsWith('lab')) {
    role = `lab ${user.role.slice(4)}`;
  } else {
    role = 'Receptionist';
  }

  return (
    <div className="welcome-message">
      <h1>{role} | Dashbourd</h1>
      <h3>Welcome back {user.name}!</h3>
    </div>
  );
}
