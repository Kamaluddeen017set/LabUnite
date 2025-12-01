'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faChartBar,
  faCog,
  faTableColumns,
  faDashboard,
} from '@fortawesome/free-solid-svg-icons';
import '../styles/Slider.css';
import { faServicestack } from '@fortawesome/free-brands-svg-icons';
import { faContactCard } from '@fortawesome/free-regular-svg-icons';
import Switch from './Switch';
import { useApp } from '../app/context/appContext';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { faSignOut } from '@fortawesome/free-solid-svg-icons/faSignOut';
export default function Slider() {
  const { setIsOpen, createPatient, isLoaded, isOpen } = useApp();
  function handleClick() {
    setIsOpen(!isOpen);
  }
  return (
    <div
      className="slider"
      style={{
        width: isOpen ? '5%' : '12%',
        filter: createPatient ? 'blur(10px)' : 'none',
      }}
      // onMouseOver={() => setIsOpen(true)}
      // onMouseOut={() => setIsOpen(false)}
    >
      <MenuIcon handleClick={handleClick} isOpen={isOpen} />
      <Logo isOpen={isOpen} />
      <Menu isOpen={isOpen} />
    </div>
  );
}
function Logo({ isOpen }) {
  return (
    <div className="logo">
      <div
        className="logo_container"
        style={{ justifySelf: 'center', borderRadius: '50%' }}
      >
        <img src="./LabUniteLogo.png" alt="logo" style={{ width: '80px' }} />
      </div>

      <h1 style={isOpen ? { display: 'none' } : { display: 'block' }}>
        Lab<span>Unite</span>
      </h1>
    </div>
  );
}

function Menu({ isOpen }) {
  const handleLogOut = () => {
    if (window.confirm('Are you sure you want to log out ?')) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userId');
      window.location.href = '/';
    }
  };
  return (
    <div className="menu">
      <ul>
        <NavList path="/" Icon={faDashboard} isOpen={isOpen}>
          Dashbourd
        </NavList>
        <NavList path="/profile" Icon={faUser} isOpen={isOpen}>
          Profile
        </NavList>
        <NavList path="/services" Icon={faServicestack} isOpen={isOpen}>
          Services
        </NavList>
        <NavList path="/reports" Icon={faChartBar} isOpen={isOpen}>
          Reports
        </NavList>{' '}
        <NavList path="/setting" Icon={faCog} isOpen={isOpen}>
          Setting
        </NavList>
        <NavList path="/about" Icon={faTableColumns} isOpen={isOpen}>
          About
        </NavList>
        <NavList path="/contact" Icon={faContactCard} isOpen={isOpen}>
          Contact
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
