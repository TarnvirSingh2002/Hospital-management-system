import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";
import { Context } from "../main";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
const Appointment = () => {
  const { isAuthenticated} = useContext(Context);
  const navigate=useNavigate();
  const handleclick=()=>{
    navigate('/allmessages');
  }
  return (
    <>
      <Hero
        title={"Schedule Your Appointment | MeeCare Medical Institute"}
        imageUrl={"/signin.png"}
      />

      {/* remove if you want */}
      {isAuthenticated&&<div
        style={{
          position: 'fixed',
          bottom: '20px', 
          right: '20px',
          width: '50px',
          height: '50px',
          backgroundColor: '#007bff',
          color: '#fff',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          cursor: 'pointer',
          transition: 'transform 0.2s ease-out',
          zIndex: 1000,
          fontSize: '24px'
        }}
        onClick={handleclick}
      >
        💬
      </div>}
      <AppointmentForm />
    </>
  );
};

export default Appointment;
