import { AppHeader } from "../AppHeader/AppHeader.jsx";
import styles from "./App.module.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from "../../pages/login/login.jsx";
import { RegisterPage } from "../../pages/register/register.jsx";
import { PwdRecoveryPage } from "../../pages/forgot-password/forgot-password.jsx";
import { PwdResetPage } from "../../pages/reset-pasword/reset-password.jsx";
import { ProfilePage } from "../../pages/profile/profile.jsx";
import { IngredientsPage } from "../../pages/ingredients/ingredients.jsx";
import { HomePage } from "../../pages/homepage/homepage.jsx";
import { AUTH_ERROR, authUserOnLoad } from "../../services/actions/authentification.jsx";
import { useDispatch, useSelector } from "react-redux";
import { ProtectedRouteElement } from "../ProtectedRoute/ProtectedRouteElement.jsx";
import { useEffect } from "react";
import { RouteForLoggedUser } from "../ProtectedRoute/RoutesForLoggedUser.jsx";
import { getCookie } from "../../services/Coockie/getCookie.jsx";
import { getFeed } from "../../services/actions/ingredientList.jsx";


function App() {

  const dispatch = useDispatch()
  const activeCoockie = getCookie("accessToken")
  useEffect(() => {
   if (activeCoockie != null) {dispatch(authUserOnLoad())} 
   else {
      dispatch({type:AUTH_ERROR})
   }
})
  console.log(document.cookie)



  return (
      <div className={styles.page}>
    <AppHeader />
   <Router>
   <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/login" element={<RouteForLoggedUser element={<LoginPage  />}/>}/>
    <Route path="/register" element={<RouteForLoggedUser element={<RegisterPage />}/>}/>
    <Route path="/forgot-password" element={<RouteForLoggedUser element={<PwdRecoveryPage />}/>}/>
    <Route path="/reset-password" element={<RouteForLoggedUser element={<PwdResetPage />}/>}/>
    <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />}/>}/>
    <Route path="/ingredients" element={<IngredientsPage />}/>
    </Routes>
    </Router>
    </div>
   );
}

export default App;
