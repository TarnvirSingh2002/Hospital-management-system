import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

export const context=createContext();

const AppWrapper=()=>{
  const [admin, setAdmin]=useState(false);
  const [authenticated, setAuthenticated]=useState(false);
  const [doctorCount, setdoctorCount]=useState(0);
  
  return (
    <>
       <context.Provider value={{authenticated,setAuthenticated, admin, setAdmin, doctorCount, setdoctorCount}}>
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
