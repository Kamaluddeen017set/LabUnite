import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useApp } from '../app/context/appContext';
export default function Hero() {
  const { currentUser, createPatient, setCreatePatient, isLoaded, isOpen } =
    useApp();
  const user = currentUser;

  const layoutstyle = {
    width: isOpen ? '84.5%' : '100%',
    marginLeft: isOpen ? '10%' : '5.5%',
    filter: createPatient ? 'blur(3px)' : 'none',
  };
  return (
    <div className="hero" style={layoutstyle}>
      <RecentTest test={user.tests} setCreatePatient={setCreatePatient} />
    </div>
  );
}
function RecentTest({ test, setCreatePatient }) {
  const date = localStorage.getItem('lastUpdate');

  // const pendingTest = test.filter(
  //   pending => pending.status === 'pending'
  // ).length;

  // const completedTest = test.filter(
  //   completed => completed.status === 'completed'
  // ).length;
  return (
    <div className="recent-test">
      <TestDone className="total-test-done">
        <h2>
          <span>XX test</span> Total Test
        </h2>
      </TestDone>
      <TestDone className="pending-test">
        <h2>
          <span>XXX test</span> Pending Test
        </h2>
      </TestDone>{' '}
      <TestDone className="pending-test">
        <h2>
          <span>XXX test</span> Completed Test
        </h2>
      </TestDone>
      <TestDone className="last-update-date">
        <button className="view-btn" onClick={() => setCreatePatient(true)}>
          <FontAwesomeIcon icon={faPlusCircle} /> Add Patient
        </button>
      </TestDone>
    </div>
  );
}

function TestDone({ className, children }) {
  return <div className="className">{children}</div>;
}
