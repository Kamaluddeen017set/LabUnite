import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/StaffInfo.css';
import {
  faEnvelope,
  faPhone,
  faVoicemail,
} from '@fortawesome/free-solid-svg-icons';
import StaffPerpormance from '../charts/StaffPerformancePie.jsx';
import StaffPerformancePie from '../charts/StaffPerformancePie.jsx';
export default function StaffInfo({ staffDetails }) {
  console.log(staffDetails);
  return (
    <div className="container1">
      <LeftSideDetails staffDetails={staffDetails} />
      <RightSideDetails staffDetails={staffDetails} />
      <StaffPerformancePie
        data={[
          { name: 'Tests Completed', value: 420 },
          { name: 'Pending Tests', value: 80 },
          { name: 'Errors', value: 20 },
        ]}
      />
    </div>
  );
}
function LeftSideDetails({ staffDetails }) {
  return (
    <div className="left-side">
      <div className="img-logo">
        <h1>{staffDetails.name.charAt(0)}</h1>
      </div>
      <h2>{staffDetails.name}</h2>
      <h3>
        <span>
          <FontAwesomeIcon icon={faEnvelope} />
        </span>

        {staffDetails.email}
      </h3>
      <h3>
        <span>
          <FontAwesomeIcon icon={faPhone} />
        </span>
        {staffDetails.phone}
      </h3>
    </div>
  );
}
function RightSideDetails({ staffDetails }) {
  return (
    <div className="right-side">
      <ul>
        <li>
          Sex
          <span>{staffDetails.gender}</span>
        </li>
        <li>
          Blood Group
          <span> {staffDetails.BloodGroup || '-'}</span>
        </li>
        <li>
          Staff Id
          <span>{staffDetails.staffId}</span>
        </li>
        <li>
          Role
          <span>
            {staffDetails.role === 'lab_technician'
              ? 'Lab Technician'
              : 'Lab Scientist'}
          </span>
        </li>

        <li>
          Status
          <span>{staffDetails.active ? 'Active' : 'Inactive'}</span>
        </li>
        <li>
          DOB/Age
          <span>{new Date(staffDetails.dateOfBath).toDateString() || ''}</span>
        </li>

        <li>
          Address
          <span>{staffDetails.address}</span>
        </li>
        <li>
          Registered Date
          <span>{new Date(staffDetails.createdAt).toDateString()}</span>
        </li>
      </ul>
    </div>
  );
}
