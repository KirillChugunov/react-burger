import { AppHeader } from "../AppHeader/AppHeader";
import styles from "./App.module.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { LoginPage } from "../../pages/login/login";
import { RegisterPage } from "../../pages/register/register";
import { PwdRecoveryPage } from "../../pages/forgot-password/forgot-password";
import { PwdResetPage } from "../../pages/reset-pasword/reset-password";
import { ProfilePage } from "../../pages/profile/profile";
import { IngredientsPage } from "../../pages/ingredients/ingredient";
import { HomePage } from "../../pages/homepage/homepage";
import {
  AUTH_FAILED,
  authUserOnLoad,
} from "../../services/actions/authentification";
import { useDispatch } from "react-redux";
import { ProtectedRouteElement } from "../ProtectedRoute/ProtectedRouteElement";
import { useEffect } from "react";
import { RouteForLoggedUser } from "../ProtectedRoute/RoutesForLoggedUser";
import { getCookie } from "../../services/Coockie/getCookie";
import { getFeed } from "../../services/actions/ingredientList";
import { Modal } from "../Modal/modal";


function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();
  const activeCoockie = getCookie("accessToken");

  useEffect(() => {
    if (activeCoockie != null) {
      console.log("нашел пользователя");
      dispatch(authUserOnLoad());
    } else {
      console.log("залогинься");
      dispatch({ type: AUTH_FAILED });
    }
  });

  useEffect(() => {
    dispatch(getFeed());
  }, []);

  return (
    <div className={styles.page}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/ingredients/:id" element={<IngredientsPage />} />
        <Route
          path="/login"
          element={<RouteForLoggedUser element={<LoginPage />} />}
        />
        <Route
          path="/register"
          element={<RouteForLoggedUser element={<RegisterPage />} />}
        />
        <Route
          path="/forgot-password"
          element={<RouteForLoggedUser element={<PwdRecoveryPage />} />}
        />
        <Route
          path="/reset-password"
          element={<RouteForLoggedUser element={<PwdResetPage />} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRouteElement element={<ProfilePage />} />}
        />
      </Routes>

      {background && (
        <Routes location={location}>
          <Route
            path="/ingredients/:id"
            element={
              <Modal
                title={"Детали ингредиента"}
                children={<IngredientsPage />}
              ></Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
