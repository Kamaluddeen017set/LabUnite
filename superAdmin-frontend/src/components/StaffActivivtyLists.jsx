import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/StaffActivivtyLists.css';
import {
  faSignIn,
  faSignInAlt,
  faTasks,
  faTasksAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
export default function StaffActivity({ staffActivities, fetchLoaded }) {
  console.log('from staff', staffActivities);

  if (!fetchLoaded) return <div>loading...</div>;

  return (
    <div className="activities">
      {staffActivities.length > 0 ? (
        staffActivities.map(activity => (
          <Activity activity={activity} key={activity._id} />
        ))
      ) : (
        <div className="empty-activities">No activity</div>
      )}
    </div>
  );
}

function Activity({ activity }) {
  let role;
  if (activity.staffId.role === 'admin') role = '';
  if (activity.staffId.role === 'lab_scientist') role = 'mlt .';
  if (activity.staffId.role === 'lab_technician') role = 'sci .';
  return (
    <div className="activity">
      <div className="task-logo">
        <FontAwesomeIcon
          style={{
            background:
              activity.action === 'Logged in'
                ? '#09f597'
                : activity.action === 'Register New Patient'
                ? 'var(--ibcolor)'
                : '#e9df1b',
          }}
          icon={
            activity.action === 'Logged in'
              ? faSignInAlt
              : activity.action === 'Register New Patient'
              ? faUser
              : faTasksAlt
          }
        />
      </div>
      <div className="activity-card">
        <div className="name">
          <div>
            <h3 className="role">
              {role}{' '}
              <span>
                {activity.staffId.role === 'admin'
                  ? 'you'
                  : activity.staffId.name.split(' ')[0]}
              </span>
            </h3>
          </div>
          <div>
            {activity.staffId.role === 'admin' ? (
              ''
            ) : (
              <button className="staff-btn">View Staff</button>
            )}
          </div>
        </div>
        <div>
          <p className="action">{activity.action}</p>
          <p className="details">{activity.details}</p>
          <span className="date">
            {new Date(activity.createdAt).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
