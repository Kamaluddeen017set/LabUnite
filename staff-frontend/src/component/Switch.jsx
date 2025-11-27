import '../styles/Switch.css';
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
        <div className="line1" />
        <div className="line2" />
        <div className="line3" />
      </label>
    </div>
  );
}
