import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useApp } from '../app/context/appContext';
import '../styles/WelcomeCard.css';
import { faNewspaper, faUser } from '@fortawesome/free-solid-svg-icons';

export default function WelcomeCard({ generalTests, date, today }) {
  console.log('from welcome', generalTests);
  const { currentUser, isLoaded, loading } = useApp();
  const time = new Date().toLocaleTimeString();
  const day = time.slice(8).toLowerCase().trim();
  const user = currentUser;
  let num = '';
  if (date === today) {
    num = generalTests?.tests?.length;
  }
  console.log('herer', generalTests?.tests);

  let greeting;
  if (day == 'am') {
    greeting = 'Good Morning!';
  } else if (day == 'pm') {
    greeting = 'Good Evening!';
  }

  if (!isLoaded || loading) {
    return <p>Loading profile...</p>;
  }
  console.log(currentUser);

  if (isLoaded && !loading && !currentUser) {
    // window.location.href = "/";
    return null;
  }
  return (
    <div className="div1">
      <div className="main_card">
        <h3>Welcome back,</h3>
        <h1 className="greeting">
          {greeting} {user.name}
        </h1>
        <div className="today-test">
          <div className="icon">
            <span>
              <FontAwesomeIcon icon={faNewspaper} />
            </span>
          </div>
          {num > -1 && (
            <div className="info">
              <span className="count">{num}</span>
              <span className="label">Today Requests</span>
            </div>
          )}

          <button
            className="view"
            onClick={() => (window.location.href = '%Lab%Admin%/ResultsPage')}
          >
            <FontAwesomeIcon icon={faUser} />
            View Requests
          </button>
        </div>
      </div>
      <div className="avaters">
        <img src="./avater.png" alt="avater" className="front" />
      </div>
    </div>
  );
}
