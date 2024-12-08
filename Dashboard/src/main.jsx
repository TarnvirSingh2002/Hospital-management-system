import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

export const context=createContext();

const AppWrapper=()=>{
  const [admin, setAdmin]=useState(false);
  const [authenticated, setAuthenticated]=useState(false);
  
  return (
    <>
       <context.Provider value={{authenticated,setAuthenticated, admin, setAdmin}}>
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
