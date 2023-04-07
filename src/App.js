
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
          <Route path="/" element={user ? <Homepage /> : <Register />}></Route>
          <Route path="/login" element={user ? <Homepage /> : <Login />}></Route>
          <Route path="/register" element=
            {user ? <Navigate to="/login" /> : <Register />}>
          </Route>
          <Route path="/userinfo" element=
            {user ? <Userinfo /> : <Register />}>
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
