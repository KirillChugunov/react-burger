import { AppHeader } from "../AppHeader/AppHeader.jsx";
import styles from "./App.module.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { LoginPage } from "../../pages/login/login.jsx";
import { RegisterPage } from "../../pages/register/register.jsx";
import { PwdRecoveryPage } from "../../pages/forgot-password/forgot-password.jsx";
import { PwdResetPage } from "../../pages/reset-pasword/reset-password.jsx";
import { ProfilePage } from "../../pages/profile/profile.jsx";
import { IngredientsPage } from "../../pages/ingredients/ingredient.jsx";
import { HomePage } from "../../pages/homepage/homepage.jsx";
import {
  AUTH_FAILED,
  authUserOnLoad,
} from "../../services/actions/authentification.jsx";
import { useDispatch, useSelector } from "react-redux";
import { ProtectedRouteElement } from "../ProtectedRoute/ProtectedRouteElement.jsx";
import { useEffect } from "react";
import { RouteForLoggedUser } from "../ProtectedRoute/RoutesForLoggedUser.jsx";
import { getCookie } from "../../services/Coockie/getCookie.jsx";
import { getFeed } from "../../services/actions/ingredientList.jsx";
import { Modal } from "../Modal/modal.jsx";
import { IngredientDetails } from "../IngredientDetails/IngredientDetails.jsx";

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
