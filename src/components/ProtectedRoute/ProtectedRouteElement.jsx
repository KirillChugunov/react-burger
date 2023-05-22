import { useEffect,  } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export function ProtectedRouteElement({ element }) {
   const userLogin = useSelector(
    (store) => store.authentification.isLogin
  );
  const isLoaded = useSelector(
    (store) => store.authentification.logginCheck
  );
  

  if (isLoaded  === true) {return userLogin ? element : <Navigate to="/login" replace/>};
}