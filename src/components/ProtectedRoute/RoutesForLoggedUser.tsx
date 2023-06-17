import { FunctionComponent, ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../../hooks/customUseSelector";

interface IRouteForLoggedUserProps {
  element: JSX.Element;
}

export const RouteForLoggedUser = ({
  element,
}: IRouteForLoggedUserProps): JSX.Element | null => {
  const userLogin = useSelector((store) => store.authentication.isLogin);
  const loginCheck = useSelector((store) => store.authentication.loginCheck);
  const prevLocation = useLocation().state?.from;
  console.log(prevLocation);
  return loginCheck ? (
    userLogin ? (
      <Navigate to={prevLocation ? prevLocation : "/"} />
    ) : (
      element
    )
  ) : null;
};
