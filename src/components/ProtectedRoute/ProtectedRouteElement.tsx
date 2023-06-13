import { AnyARecord } from "dns";
import { FunctionComponent, ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "../../hooks/customUseSelector";

interface IProtectedRouteElementProps {
  element: ReactNode;
}

export const ProtectedRouteElement: FunctionComponent<
  IProtectedRouteElementProps
> = ({ element }) => {
  const userLogin = useSelector((store) => store.authentication.isLogin);
  const isLoaded = useSelector((store) => store.authentication.loginCheck);

  if (isLoaded === true) {
    return userLogin ? element : ((<Navigate to="/login" replace />) as any);
  }
};