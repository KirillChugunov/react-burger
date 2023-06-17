import { AnyARecord } from "dns";
import {
  FunctionComponent,
  JSXElementConstructor,
  ReactNode,
  useEffect,
} from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "../../hooks/customUseSelector";

interface IProtectedRouteElementProps {
  element: JSX.Element;
}

export const ProtectedRouteElement = ({
  element,
}: IProtectedRouteElementProps): JSX.Element | null => {
  const userLogin = useSelector((store) => store?.authentication?.isLogin);
  return userLogin ? element : <Navigate to="/login" replace />;
};
