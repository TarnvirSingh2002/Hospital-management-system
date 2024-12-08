import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Components/Login"
import "./App.css";
import Dashboard from "./Components/Dashboard";
import AddNewDoctor from "./Components/AddNewDoctor";
import AddNewAdmin from "./Components/AddNewAdmin";
import Doctors from "./Components/Doctors";
import Message from "./Components/Message";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./Components/Sidebar";
import { useContext, useEffect } from "react";
import { context } from "./main";
import axios from "axios";
function App() {
  const { authenticated, setAuthenticated, admin, setAdmin } = useContext(context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/message/admin/me",
          {
            withCredentials: true,
          }
        );
        setAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        setAuthenticated(false);
        setAdmin({});
      }
    };
    fetchUser();
  }, [authenticated]);
  console.log(admin);

  return (
    <>
    <BrowserRouter>
    <Sidebar/>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/doctor/addnew" element={<AddNewDoctor />} />
      <Route path="/admin/addnew" element={<AddNewAdmin />} />
      <Route path="/messages" element={<Message />} />
      <Route path="/doctors" element={<Doctors />} />
    </Routes>
    <ToastContainer position="top-center"/>
    </BrowserRouter>
      
    </>
  )
}

export default App
