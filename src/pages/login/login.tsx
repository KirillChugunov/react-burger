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
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const dispatch: any = useDispatch();
  const isLoginFailed = useSelector(
    (store) => store.authentication.loginFailed
  );
  console.log(isLoginFailed);

  function handleLoginButton(e:React.FormEvent<HTMLFormElement>, email: string, password: string) {
    e.preventDefault();
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
      <form className={styles.input_container} onSubmit={(e) => handleLoginButton(e, email, password)}>
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
        <div className="mt-6">
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
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
      </form>
    </div>
  );
};
