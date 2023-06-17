import { FunctionComponent, ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "../../hooks/customUseSelector";

interface IRouteForLoggedUserProps {
  element: JSX.Element;
}

export const RouteForLoggedUser = ({
  element,
}: IRouteForLoggedUserProps): JSX.Element | null => {
  const userLogin = useSelector((store) => store.authentication.isLogin);

  return userLogin ? <Navigate to="/" replace /> : element;
};
