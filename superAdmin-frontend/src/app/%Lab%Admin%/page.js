import AdminDashbord from '../../components/AdminDashbord';
import AdminSlider from '../../components/AdminSlider';
import Navber from '../../components/Navber';
// import LabManagerDashbourd from "../../components/LabManagerDashbourd";
import '../../styles/globals.css';
export default function AdminPage() {
  return (
    <>
      <AdminSlider />

      <Navber />
      <AdminDashbord />
      {/* <LabManagerDashbourd /> */}
    </>
  );
}
