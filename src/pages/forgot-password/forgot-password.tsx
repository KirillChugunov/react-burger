import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./loginpage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/Api/api";

export function PwdRecoveryPage() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState<string>(" ");

  function handleResetPassword(email: string) {
    resetPassword(email).then(
      (res) => (
        console.log(res),
        res.success === true
          ? navigate("/reset-password", { state: true })
          : console.log("ошибка")
      )
    );
  }

  return (
    <div className={styles.registration_container}>
      <h1
        className={`${styles.text_container}` + " text text_type_main-medium"}
      >
        Восстановление пароля
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
      <div className="mt-6">
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => handleResetPassword(email)}
        >
          Восстановить
        </Button>
      </div>
      <div className="mt-20">
        <p className="text text_type_main-default">
          Вспомнили пароль? <Link to={"/login"}>Войти</Link>
        </p>
      </div>
    </div>
  );
}
