import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FunctionComponent, useEffect } from "react";
import styles from "./loginpage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { checkLogin } from "../../services/actions/authentication";
import { useDispatch } from "../../hooks/customDispatch";
import { useSelector } from "../../hooks/customUseSelector";

export const LoginPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("bob@example.com");
  const [password, setPassword] = React.useState("password");
  const dispatch: any = useDispatch();
  const isLoginFailed = useSelector(
    (store) => store.authentication.loginFailed
  );
  console.log(isLoginFailed);

  function handleLoginButton(email: string, password: string) {
    dispatch(checkLogin(email, password));
    navigate("/");
  }

  return (
    <div className={styles.registration_container}>
      <h1
        className={`${styles.text_container}` + " text text_type_main-medium"}
      >
        Вход
      </h1>
      <div className={styles.input_container}>
        <div className="mt-6">
          <EmailInput
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name={"email"}
            isIcon={false}
          />
        </div>
      </div>
      <div className={styles.input_container}>
        <div className="mt-6">
          <PasswordInput
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name={"password"}
            extraClass="mb-2"
          />
        </div>
        <div className="mt-6">
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={() => handleLoginButton(email, password)}
          >
            Войти
          </Button>
        </div>
        <div className="mt-20">
          <p className="text text_type_main-default">
            Вы - новый пользователь?
            <Link to="/register">Зарегистрироваться</Link>
          </p>
        </div>
        <div className="mt-4">
          <Link className="text text_type_main-default" to="/forgot-password">
            Забыли пароль?
          </Link>
        </div>
      </div>
    </div>
  );
};
