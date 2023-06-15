import { FunctionComponent, ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "../../hooks/customUseSelector";

interface IRouteForLoggedUserProps {
  element: ReactNode;
}

export const RouteForLoggedUser: FunctionComponent<
IRouteForLoggedUserProps
> = ({ element }) => {
  const userLogin = useSelector((store) => store.authentication.isLogin);
 
    return userLogin ? (<Navigate to="/" replace /> as any) : element
  
};
