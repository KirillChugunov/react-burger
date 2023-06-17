import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FunctionComponent, useEffect, useState } from "react";
import styles from "./loginpage.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { checkLogin } from "../../services/actions/authentication";
import { useDispatch } from "../../hooks/customDispatch";
import { requestLogin } from "../../services/Api/api";

export const LoginPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const dispatch = useDispatch();
  const [error, setError] = useState<Boolean>(false);
  const [textError, setTextError] = useState<String>("");

const prevLocation = useLocation().state?.from



  function handleLoginSuccess(
    name: string,
    email: string,
    password: string,
    accessToken: string,
    refreshToken: string
  ) {
    navigate(prevLocation, prevLocation);
    setError(false);
    setTextError("");
    dispatch(checkLogin(email, password, name, accessToken, refreshToken));
  }
  function handleLoginButton(
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) {
    e.preventDefault();
    requestLogin(email, password)
      .then((res) => {
        handleLoginSuccess(
          res.user.name,
          res.user.email,
          password,
          res.accessToken,
          res.refreshToken
        );
      })
      .catch((err) => {
        setError(true);
        setTextError(err);
      });
  }

  return (
    <div className={styles.registration_container}>
      <h1
        className={`${styles.text_container}` + " text text_type_main-medium"}
      >
        Вход
      </h1>
      <form
        className={styles.input_container}
        onSubmit={(e) => handleLoginButton(e, email, password)}
      >
        <div className="mt-6">
          <EmailInput
            placeholder="example@yandex.ru"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name={"email"}
            isIcon={false}
          />
        </div>
        <div className={styles.input_container}>
          <div className="mt-6">
            <PasswordInput
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name={"password"}
              extraClass="mb-2"
            />
          </div>
          {error && <p>Логин или пароль не верный</p>}
          <div className="mt-6">
            <Button htmlType="submit" type="primary" size="medium">
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
      </form>
    </div>
  );
};
