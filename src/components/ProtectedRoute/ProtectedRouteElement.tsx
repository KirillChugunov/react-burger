import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../../hooks/customUseSelector";

interface IProtectedRouteElementProps {
  element: JSX.Element;
}

export const ProtectedRouteElement = ({
  element,
}: IProtectedRouteElementProps): JSX.Element | null => {
  const location = useLocation().pathname;
  const userLogin = useSelector((store) => store?.authentication?.isLogin);
  const loginCheck = useSelector((store) => store.authentication.loginCheck);

  return loginCheck ? (
    userLogin ? (
      element
    ) : (
      <Navigate to={"/login"} state={{ from: location }} />
    )
  ) : null;
};
