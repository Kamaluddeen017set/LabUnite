'use client';
import ProfileImage from './ProfileImage';
import { useApp } from '../app/context/appContext';
import Logo from './Logo';
export default function Navber() {
  const {
    currentUser,
    loading,
    createPatient,
    isLoaded,
    isOpen,
    profileImage,
    createStaff,
  } = useApp();

  if (!isLoaded || loading) {
    return <p>Loading profile...</p>;
  }
  console.log(currentUser);
  // 🚀 Only redirect AFTER loading is finished
  if (isLoaded && !loading && !currentUser) {
    // window.location.href = "/";
    return null;
  }
  console.log(currentUser);
  const user = currentUser;
  console.log(user);
  const layoutstyle = {
    // width: "99%",

    filter: createPatient || createStaff ? 'blur(10px)' : 'none',
  };
  return (
    <div className="nav" style={layoutstyle}>
      <Logo />
      <Icons
        user={user}
        key={user?.labId || user.role}
        profileImage={profileImage}
      />
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

// function WelcomeMessage({ user }) {
//   let role;
//   if (user.role === "admin") role = "lab manager";
//   if (user.role === "CEO") role = "CEO/Founder LabUnite";
//   return (
//     <div className="welcome-message">
//       <h1>{role} | Dashbourd</h1>
//     </div>
//   );
// }
