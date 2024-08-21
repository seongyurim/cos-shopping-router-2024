import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from  "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './page/Home';
import Login from './page/Login';
import Navbar from './component/Navbar';
import PrivateRoute from './route/PrivateRoute';
import ScrollToTopButton from './component/ScrollToTopButton';

function App() {
  const { authenticate } = useSelector(state => state.auth);

  useEffect(() => {
    console.log("setAuthenticate: " + authenticate);
  }, [authenticate]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login" element={<Login />} />
        <Route
          path="/product/:id" element={<PrivateRoute />} />
      </Routes>
      <ScrollToTopButton />
    </div>
  );
}

export default App;
