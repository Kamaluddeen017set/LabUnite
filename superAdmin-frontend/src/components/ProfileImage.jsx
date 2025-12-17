import { useApp } from "../app/context/appContext";

export default function ProfileImage({ className1, className2 }) {
  const { profileImage } = useApp();
  return (
    <div className={className1}>
      <img
        className={className2}
        src={profileImage || "./default-image.png"}
        alt="profile image"
      />
    </div>
  );
}
