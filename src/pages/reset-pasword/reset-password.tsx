import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FunctionComponent } from "react";
import styles from "./loginpage.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { requestNewPassword } from "../../services/Api/api";

export const PwdResetPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [password, setPassword] = React.useState<string>("password");
  const [mailcode, setMailCode] = React.useState<string>("mailcode");

  function handleResetPassword(
    e: React.FormEvent<HTMLFormElement>,
    password: string,
    token: string
  ) {
    e.preventDefault();
    requestNewPassword(password, token);
    navigate("/");
  }

  const stateLocation = useLocation().state;
  !stateLocation && navigate("/");

  return (
    <div className={styles.registration_container}>
      <h1
        className={`${styles.text_container}` + " text text_type_main-medium"}
      >
        Восстановление пароля
      </h1>
      <form onSubmit={(e) => handleResetPassword(e, password, mailcode)}>
        <div className={styles.input_container}>
          <div className="mt-6">
            <PasswordInput
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name={"password"}
              extraClass="mb-2"
            />
          </div>
        </div>
        <div className={styles.input_container}>
          <div className="mt-6">
            <Input
              type={"text"}
              placeholder={"Введите код из письма"}
              onChange={(e) => setMailCode(e.target.value)}
              icon={"CurrencyIcon"}
              value={mailcode}
              name={"name"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              extraClass="ml-1"
            />
          </div>
        </div>
        <div className="mt-6">
          <Button htmlType="submit" type="primary" size="medium">
            Восстановить
          </Button>
        </div>
      </form>
      <div className="mt-20">
        <p className="text text_type_main-default">
          Вспомнили пароль? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
};
