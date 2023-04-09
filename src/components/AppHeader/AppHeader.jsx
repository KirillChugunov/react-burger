import React from "react";
import styles from "./AppHeader.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function AppHeader() {
  return (
    <header className={styles.header}>
       <div style={{ color: "none" }} className="m-4">
        <nav className={styles.header__navigation}>
        <div className={styles.header__item}>
          <BurgerIcon type="primary" />
          <h2 className="text text_type_main-medium">Конструктор</h2>
        </div>

        <div className={styles.header__item}>
          <ListIcon type="primary" />
          <h2 className="text text_type_main-medium">Лента заказов</h2>
        </div>
        </nav>
      </div>

      <div style={{ color: "none" }} className="m-4">
        <Logo />
      </div>
      <div style={{ color: "none" }} className="m-4">
      <div className={styles.header__item}>
           <ProfileIcon type="primary" />
          <h2 className="text text_type_main-medium">Личный кабинет</h2>
      </div>
      </div>
    </header>
  );
}
