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

export const App = (): JSX.Element | null => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const dispatch: any = useDispatch();
  const activeCoockie: string | undefined = getCookie("accessToken");
  const [coockieCount, setCount] = useState(0);

 useEffect(() => {
  setTimeout(() => {
    setCount(coockieCount + 1);
  }, 54000);
  console.log(coockieCount)
    if (activeCoockie != null || 0) {
      console.log("нашел пользователя");
      dispatch(authUserOnLoad());
    } else {
      console.log("залогинься");
      dispatch({ type: AUTH_FAILED });
    }
  }, [coockieCount]);



  useEffect(() => {
    dispatch(getFeed());
  }, []);

  const closePopup = () => {
    closeIngrModal();
    closeOrderrModal();
    dispatch({
      type: DELETE_CURRENT_INGREDIENT,
      item: "",
    });
  };

  const { closeModal: closeIngrModal } = useModal();
  const { closeModal: closeOrderrModal } = useModal();

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
        <Route path="/feed/1" element={<CurrentOrderFeed />} />
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
        </Routes>
      )}
    </div>
  );
};

export default App;
