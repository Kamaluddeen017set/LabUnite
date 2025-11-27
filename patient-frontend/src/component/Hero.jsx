import { useApp } from '../app/context/appContext';
export default function Hero() {
  const { isOpen, currentPatient } = useApp();
  const patient = currentPatient;

  const layoutstyle = {
    width: isOpen ? '84.5%' : '100%',
    marginLeft: isOpen ? '10%' : '5.5%',
  };
  return (
    <div className="hero" style={layoutstyle}>
      <RecentTest test={patient.tests} />
    </div>
  );
}
function RecentTest({ test }) {
  const date = localStorage.getItem('lastUpdate');

  const pendingTest = test.filter(
    pending => pending.status === 'pending'
  ).length;

  const completedTest = test.filter(
    completed => completed.status === 'completed'
  ).length;
  return (
    <div className="recent-test">
      <TestDone className="total-test-done">
        <h2>
          <span>{test.length} test</span> Total Test
        </h2>
      </TestDone>
      <TestDone className="pending-test">
        <h2>
          <span>{pendingTest} test</span> Pending Test
        </h2>
      </TestDone>{' '}
      <TestDone className="pending-test">
        <h2>
          <span>{completedTest} test</span> Completed Test
        </h2>
      </TestDone>
      <TestDone className="last-update-date">
        <h2>
          <span>{date.slice(0, 15)}</span> Last Updated Date
        </h2>
      </TestDone>
    </div>
  );
}

function TestDone({ className, children }) {
  return <div className="className">{children}</div>;
}
