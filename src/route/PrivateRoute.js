import React from 'react';
import Detail from '../page/Detail';
import { Navigate } from  "react-router-dom";
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const authenticate = useSelector(state => state.auth.authenticate);
  return authenticate == true ? <Detail /> : <Navigate to="/login" />;
};

export default PrivateRoute;