import {
  faArrowRight,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/ActivityLog.css';
import Calender from './Calendar';
export default function ActivityLog() {
  return (
    <div className="div7">
      <div className="title">
        <h2>Daily staffs Activity</h2>{' '}
        <a href="#" className="activity-view-all">
          View all <FontAwesomeIcon icon={faArrowRight} />
        </a>
      </div>
      <Calender />
    </div>
  );
}
