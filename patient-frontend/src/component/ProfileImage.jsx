export default function ProfileImage({ profileImage, className1, className2 }) {
  return (
    <div className={className1}>
      <img
        className={className2}
        src={profileImage || './default-image.png'}
        alt="profile image"
      />
    </div>
  );
}
