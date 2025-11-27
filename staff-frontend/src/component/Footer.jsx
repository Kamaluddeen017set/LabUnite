'use client';
import { useApp } from '../app/context/appContext';
import '../styles/Footer.css';
export default function Footer() {
  const { createPatient } = useApp();
  return (
    <footer
      className="footer"
      style={{ filter: createPatient ? 'blur(10px)' : 'none' }}
    >
      Footer
    </footer>
  );
}
