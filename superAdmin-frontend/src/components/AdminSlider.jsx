'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog,
  faDashboard,
  faNoteSticky,
  faSliders,
  faTasks,
  faUser,
  faUserDoctor,
} from '@fortawesome/free-solid-svg-icons';
import '../styles/Slider.css';
import { faPadlet, faServicestack } from '@fortawesome/free-brands-svg-icons';
import { faContactCard } from '@fortawesome/free-regular-svg-icons';
import Switch from './Switch';
import { useApp } from '../app/context/appContext';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { faSignOut } from '@fortawesome/free-solid-svg-icons/faSignOut';
export default function AdminSlider() {
  const { setIsOpen, createPatient, createStaff, isLoaded, isOpen } = useApp();
  function handleClick() {
    setIsOpen(!isOpen);
  }
  return (
    <div
      className="slider "
      style={{
        filter: createPatient || createStaff ? 'blur(10px)' : 'none',
      }}
    >
      <MenuIcon handleClick={handleClick} isOpen={isOpen} />
      <Menu isOpen={isOpen} />
    </div>
  );
}

function Menu({ isOpen }) {
  const handleLogOut = () => {
    if (window.confirm('Are you sure you want to log out ?')) {
      localStorage.removeItem('LabAdminStrongToken');
      localStorage.removeItem('SuperAdminStrongToken');
      localStorage.removeItem('LabAdminId');
      localStorage.removeItem('role');
      window.location.href = '/';
    }
  };
  return (
    <div className="menu">
      <ul>
        <NavList path="/%Lab%Admin%" Icon={faDashboard} isOpen={isOpen}>
          Dashbourd
        </NavList>
        <NavList path="/%Lab%Admin%/Staffs" Icon={faUserDoctor} isOpen={isOpen}>
          Staffs
        </NavList>
        <NavList path="/%Lab%Admin%/Patients" Icon={faUser} isOpen={isOpen}>
          Patients
        </NavList>
        <NavList path="/%Lab%Admin%/ResultsPage" Icon={faTasks} isOpen={isOpen}>
          Results
        </NavList>

        <NavList
          path="/%Lab%Admin%/testTemplates"
          Icon={faSliders}
          isOpen={isOpen}
        >
          Tests Templetes
        </NavList>
        <NavList
          path="/%Lab%Admin%/activityLogs"
          Icon={faNoteSticky}
          isOpen={isOpen}
        >
          Activity Logs
        </NavList>
        <NavList path="/%Lab%Admin%/adminSetting" Icon={faCog} isOpen={isOpen}>
          Settings
        </NavList>
        <br />
        <br />
        <br />
        <NavList
          path="#"
          Icon={faSignOut}
          isOpen={isOpen}
          handleLogOut={handleLogOut}
        >
          Log Out
        </NavList>
      </ul>
    </div>
  );
}
function NavList({ children, isOpen, path, Icon, handleLogOut }) {
  const Pathname = usePathname();
  return (
    <li>
      <Link
        href={path}
        className={Pathname === path ? 'active' : 'unactive'}
        onClick={handleLogOut}
      >
        <FontAwesomeIcon
          icon={Icon}
          style={
            isOpen
              ? {
                  fontSize: '1.2rem',
                  alignSelf: 'center',

                  color: 'var(--tcolor)',
                }
              : {}
          }
        />

        <span
          style={isOpen ? {} : { paddingLeft: '15px', paddingRight: '4px' }}
        >
          {isOpen ? '' : children}
        </span>
      </Link>
    </li>
  );
}
function MenuIcon({ handleClick, isOpen }) {
  return <Switch handleClick={handleClick} />;
}
