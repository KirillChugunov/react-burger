import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./registerpage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleRegistration } from "../../services/actions/authentification";

export function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = React.useState("bob@example.com");
  const [email, setEmail] = React.useState("bob@example.com");
  const [password, setPassword] = React.useState("password");

  function handleRegistrationButton(name, email, password) {
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
}
