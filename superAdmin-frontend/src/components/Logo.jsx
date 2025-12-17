export default function Logo() {
  return (
    <div className="logo">
      <div
        className="logo_container"
        style={{ justifySelf: 'left', borderRadius: '50%' }}
      >
        <img src="../LabUniteLogo.png" alt="logo" style={{ width: '50px' }} />
        <h3>
          Lab<span>Unite</span>
        </h3>
      </div>
    </div>
  );
}
