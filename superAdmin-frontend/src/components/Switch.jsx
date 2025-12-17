import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/Switch.css';
import { faTableColumns } from '@fortawesome/free-solid-svg-icons';
export default function Switch({ handleClick }) {
  return (
    <div className="menu">
      <input
        type="checkbox"
        className="check"
        id="check"
        onClick={handleClick}
      />
      <label htmlFor="check" className="hamburger-button">
        <FontAwesomeIcon icon={faTableColumns} />
      </label>
    </div>
  );
}
