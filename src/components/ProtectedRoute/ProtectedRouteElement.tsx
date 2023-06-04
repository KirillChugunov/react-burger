import { AnyARecord } from "dns";
import { FunctionComponent, ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface IProtectedRouteElementProps {
  element: ReactNode;
}

export const ProtectedRouteElement: FunctionComponent<
  IProtectedRouteElementProps
> = ({ element }) => {
  const userLogin = useSelector((store: any) => store.authentification.isLogin);
  const isLoaded = useSelector(
    (store: any) => store.authentification.logginCheck
  );

  if (isLoaded === true) {
    return userLogin ? element : ((<Navigate to="/login" replace />) as any);
  }
};
