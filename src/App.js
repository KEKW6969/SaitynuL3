import './index.css';
import Navbar from './components/Navbar/Navbar';
import Grid from '@mui/material/Grid'
import { Outlet } from 'react-router-dom';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Hotels from './pages/Hotels/Hotels';
import Floors from './pages/Floors/Floors';
import Rooms from './pages/Rooms/Rooms';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Logout from './pages/Logout/Logout';
import Welcome from './pages/Welcome/Welcome';
import useToken from './useToken';


function App() {

  const { token, setToken } = useToken();

  if (!token) {
    return (
      <BrowserRouter>
      <Grid container>
        <Navbar token={token}/>
        <Outlet />
      </Grid>
      <Routes>
          <Route path="hotels/:hotelId/floors/:floorId/rooms" element={ <Login setToken={setToken}/>}/>
          <Route path="hotels/:id/floors" element={<Login setToken={setToken}/>}/>
          <Route path="hotels" element={<Hotels />}/>
          <Route path="login" element={<Login setToken={setToken}/>}/>
          <Route path="register" element={<Register />}/>
          <Route path="logout" element={<Welcome />}/>
          <Route index element={<Hotels/>}/>
      </Routes>
      </BrowserRouter>
    );
  }

  return (
  <BrowserRouter>
  <Grid container>
    <Navbar token={token}/>
    <Outlet />
  </Grid>
  <Routes>
      <Route path="hotels/:hotelId/floors/:floorId/rooms" element={ <Rooms />}/>
      <Route path="hotels/:id/floors" element={<Floors />}/>
      <Route path="hotels" element={<Hotels token={token}/>}/>
      <Route path="login" element={<Hotels />}/>
      <Route path="register" element={<Hotels />}/>
      <Route path="logout" element={<Logout setToken={setToken} token={token} />}/>
      <Route index element={<Hotels/>}/>
  </Routes>
  </BrowserRouter>

  );
}
//<Route path="login" element={<Login />}/>
export default App;
