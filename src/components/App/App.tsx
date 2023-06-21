import { AppHeader } from "../AppHeader/AppHeader";
import styles from "./App.module.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
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
  refreshAcsesToken,
} from "../../services/actions/authentication";
import { ProtectedRouteElement } from "../ProtectedRoute/ProtectedRouteElement";
import { useEffect } from "react";
import { RouteForLoggedUser } from "../ProtectedRoute/RoutesForLoggedUser";
import { getCookie } from "../../services/Coockie/getCookie";
import { getFeed } from "../../services/actions/ingredientList";
import { Modal } from "../Modal/modal";
import { OrdersFeed } from "../../pages/orders-feed/feed";
import { CurrentOrderFeed } from "../../pages/current-order-feed/current-order-feed";
import { ProfileInputs } from "../ProfileInputs/ProfileInputs";
import { OrdersHistoryFeed } from "../OrdersHistoryFeed/OrdersHistoryFeed";
import { CurrentOrderHistoryFeed } from "../../pages/current-order-hisrory/current-order-history-feed";
import { useDispatch } from "../../hooks/customDispatch";
import type {} from "redux-thunk/extend-redux";

export const App = (): JSX.Element | null => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();
  const refreshToken: string | undefined = getCookie("refreshToken");
  const accessToken: string | undefined = getCookie("accessToken");
  const navigate = useNavigate();

  const CheckUser = (
    refreshToken: string | undefined,
    accessToken: string | undefined
  ) => {
    refreshToken === undefined && dispatch({ type: AUTH_FAILED });
    refreshToken !== undefined &&
      accessToken !== undefined &&
      dispatch(authUserOnLoad(accessToken));
    refreshToken !== undefined &&
      accessToken === undefined &&
      dispatch(refreshAcsesToken());
  };

  useEffect(() => {
    CheckUser(refreshToken, accessToken);
  }, []);

  useEffect(() => {
    dispatch(getFeed());
  }, []);

  const closeRouteModal = () => {
    navigate(-1);
  };

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
        >
          <Route path="/profile/" element={<ProfileInputs />} />
          <Route path="/profile/orders" element={<OrdersHistoryFeed />} />
        </Route>
        <Route path="/feed" element={<OrdersFeed />} />
        <Route
          path="/profile/orders/:id"
          element={<CurrentOrderHistoryFeed />}
        />
        <Route path="/feed/:id" element={<CurrentOrderFeed />} />
      </Routes>

      {background && (
        <Routes location={location}>
          <Route
            path="/ingredients/:id"
            element={
              <Modal
                closePopup={closeRouteModal}
                title={"Детали ингредиента"}
                children={<IngredientsPage />}
              ></Modal>
            }
          />

          <Route
            path="/feed/:id"
            element={
              <Modal
                closePopup={closeRouteModal}
                children={<CurrentOrderFeed />}
              ></Modal>
            }
          />

          <Route
            path="/profile/orders/:id"
            element={
              <Modal
                closePopup={closeRouteModal}
                children={<CurrentOrderHistoryFeed />}
              ></Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
