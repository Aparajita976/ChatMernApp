
import './App.css';
import Register from './pages/register';
import Login from './pages/login';
import Homepage from './pages/homepage';
import Userinfo from './pages/userinfo';
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { useContext } from 'react';
import { Context } from './context/Context';
function App() {
  const { user } = useContext(Context)
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />

          <Route path="/homepage" element={user ? <Homepage /> : <Navigate to="/" />} />

          <Route path="/signin" element={user ? <Navigate to="/homepage" /> : <Login />} />
          <Route path="/signin" element={<Login />} />

          <Route path="/userinfo" element={user ? <Userinfo /> : <Login />} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
