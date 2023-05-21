import { AppHeader } from "../AppHeader/AppHeader.jsx";
import styles from "./App.module.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from "../../pages/login/login.jsx";
import { RegisterPage } from "../../pages/register/register.jsx";
import { PwdRecoveryPage } from "../../pages/forgot-password/forgot-password.jsx";
import { PwdResetPage } from "../../pages/reset-pasword/reset-password.jsx";
import { ProfilePage } from "../../pages/profile/profile.jsx";
import { IngredientsPage } from "../../pages/ingredients.jsx";
import { HomePage } from "../../pages/homepage/homepage.jsx";
import { AuthUserOnLoad } from "../../services/actions/authentification.jsx";
import { useDispatch } from "react-redux";


function App() {
  const dispatch = useDispatch()
dispatch(AuthUserOnLoad())

  return (
    <div className={styles.page}>
    <AppHeader />
   <Router>
   <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/login" element={<LoginPage />}/>
    <Route path="/register" element={<RegisterPage />}/>
    <Route path="/forgot-password" element={<PwdRecoveryPage />}/>
    <Route path="/reset-password" element={<PwdResetPage />}/>
    <Route path="/profile" element={<ProfilePage />}/>
    <Route path="/ingredients/:id" element={<IngredientsPage />}/>
    </Routes>
    </Router>
    </div>
   );
}

export default App;
