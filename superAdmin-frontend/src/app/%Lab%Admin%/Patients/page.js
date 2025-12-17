import AdminSlider from '../../../components/AdminSlider';
import Footer from '../../../components/Footer';
import Navber from '../../../components/Navber';
import Patients from '../../../components/Patients';
import '../../../styles/globals.css';
export default function ManagePatientsPage() {
  return (
    <>
      <AdminSlider />
      <Navber />
      <Patients />

      <Footer />
    </>
  );
}
