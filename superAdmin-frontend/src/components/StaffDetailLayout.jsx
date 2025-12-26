import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StaffInfo from './StaffInfo';
import Stats from './Stat';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function StaffDetailLayout({ staffDetails }) {
  const patientsStat = {
    className: 'container2',
    icon: <FontAwesomeIcon icon={faUser} />,
    title: 'Patients Registered',
    text: ` patient registered`,
    num: 78,
    url: '/%Lab%Admin%/Patients',
    color1: 'lightgreen',
    color2: 'darkgreen',
  };
  const patienthsStat = {
    className: 'container3',
    icon: <FontAwesomeIcon icon={faUser} />,
    title: 'Test Added',
    text: 'test added',
    num: 78,
    url: '/%Lab%Admin%/Patients',
    color1: 'lightgreen',
    color2: 'darkgreen',
  };
  const patientttsStat = {
    className: 'container4',
    icon: <FontAwesomeIcon icon={faUser} />,
    title: 'Patients Registered',
    text: ` patient registered`,
    num: 78,
    url: '/%Lab%Admin%/Patients',
    color1: 'lightgreen',
    color2: 'darkgreen',
  };
  const testLIST = {
    className: 'container5',
    icon: <FontAwesomeIcon icon={faUser} />,
    title: 'Patients Registered',
    text: ` patient registered`,
    num: 78,
    url: '/%Lab%Admin%/Patients',
    color1: 'lightgreen',
    color2: 'darkgreen',
  };
  console.log('staff', staffDetails);
  return (
    <div className="staff-details">
      <StaffInfo staffDetails={staffDetails} />
      <Stats data={patientsStat} staffDetails={staffDetails} />
      <Stats data={patienthsStat} staffDetails={staffDetails} />
      <Stats data={patientttsStat} staffDetails={staffDetails} />
      <Stats data={testLIST} />
      <div className="container6"> 6</div>
      <div className="container7"> 7</div>
    </div>
  );
}
