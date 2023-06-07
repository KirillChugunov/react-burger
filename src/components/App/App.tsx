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
  refreshAcsesToken,
} from "../../services/actions/authentification";
import { useDispatch, useSelector } from "react-redux";
import { ProtectedRouteElement } from "../ProtectedRoute/ProtectedRouteElement";
import { useEffect, useState } from "react";
import { RouteForLoggedUser } from "../ProtectedRoute/RoutesForLoggedUser";
import { getCookie } from "../../services/Coockie/getCookie";
import { getFeed } from "../../services/actions/ingredientList";
import { Modal } from "../Modal/modal";
import { useModal } from "../../hooks/useModal";
import { DELETE_CURRENT_INGREDIENT } from "../../services/actions/currentingredient";
import { OrdersFeed } from "../../pages/orders-feed/feed";
import { CurrentOrderFeed } from "../../pages/current-order-feed/current-order-feed";
import { ProfileInputs } from "../ProfileInputs/ProfileInputs";
import { OrdersHistoryFeed } from "../OrdersHistoryFeed/OrdersHistoryFeed";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  getfeeeeeeeeeeeed,
} from "../../services/middleware/wsmiddlewareActions";
import { CurrentOrderHistoryFeed } from "../../pages/current-order-hisrory/current-order-history-feed";
import { Preloader } from "../Preloader/preloader";

export const App = (): JSX.Element | null => {
  const isLoaded = useSelector(
    (store: any) => store.authentification.logginCheck
  );
  const location = useLocation();
  const background = location.state && location.state.background;
  const dispatch: any = useDispatch();
  const refreshToken: any = getCookie("refreshToken");
  const accessToken: any = getCookie("accessToken");

  const CheckUser = (
    refreshToken: string | undefined,
    accessToken: string | undefined
  ) => {
    refreshToken === undefined && dispatch({ type: AUTH_FAILED });
    refreshToken != undefined &&
      accessToken != undefined &&
      dispatch(authUserOnLoad(accessToken));
    refreshToken != undefined &&
      accessToken === undefined &&
      dispatch(refreshAcsesToken());
  };

  CheckUser(refreshToken, accessToken);

  const closePopup = () => {
    closeIngrModal();
    closeOrderrModal();
    dispatch({
      type: DELETE_CURRENT_INGREDIENT,
      item: "",
    });
  };

  useEffect(() => {
    dispatch(getFeed());
  }, []);

  const { closeModal: closeIngrModal } = useModal();
  const { closeModal: closeOrderrModal } = useModal();

  return (
    <div className={styles.page}>
      <AppHeader />
      <Routes location={background || location}>
        <Route  path="/" element={<HomePage />} />
        <Route path="/2" element={<Preloader />} />
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
                closePopup={closePopup}
                title={"Детали ингредиента"}
                children={<IngredientsPage />}
              ></Modal>
            }
          />

          <Route
            path="/feed/:id"
            element={
              <Modal
                closePopup={closePopup}
                children={<CurrentOrderFeed />}
              ></Modal>
            }
          />

          <Route
            path="/profile/orders/:id"
            element={
              <Modal
                closePopup={closePopup}
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
