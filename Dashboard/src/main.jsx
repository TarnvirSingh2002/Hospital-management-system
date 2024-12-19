import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

export const context=createContext();

const AppWrapper=()=>{
  const [admin, setAdmin]=useState(false);
  const [authenticated, setAuthenticated]=useState(false);
  const [doctorCount, setdoctorCount]=useState();
  const [doctors, setDoctors] = useState([]);
  return (
    <>
       <context.Provider value={{doctors, setDoctors, authenticated,setAuthenticated, admin, 
        setAdmin, doctorCount, setdoctorCount}}>
          <App />
       </context.Provider>
    </>
  );
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper/>
  </StrictMode>,
)
