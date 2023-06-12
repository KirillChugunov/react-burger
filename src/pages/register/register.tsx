import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FunctionComponent } from "react";
import styles from "./registerpage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { handleRegistration } from "../../services/actions/authentication";
import { useDispatch } from "../../hooks/customDispatch";

export const RegisterPage: FunctionComponent = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = React.useState<string>("bob@example.com");
  const [email, setEmail] = React.useState<string>("bob@example.com");
  const [password, setPassword] = React.useState<string>("password");

  function handleRegistrationButton(
    name: string,
    email: string,
    password: string
  ) {
    dispatch(handleRegistration(name, email, password));
    navigate("/");
  }

  return (
    <div className={styles.registration_container}>
      <h1
        className={`${styles.text_container}` + " text text_type_main-medium"}
      >
        Регистрация
      </h1>
      <div className={styles.input_container}>
        <div className="mt-6">
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => setName(e.target.value)}
            value={name}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />
        </div>
      </div>
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
            onClick={() => handleRegistrationButton(name, email, password)}
          >
            Зарегистрироваться
          </Button>
        </div>
        <div className="mt-20">
          <p className="text text_type_main-default">
            Уже зарегистрированы? <Link to="/login">Войти</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
