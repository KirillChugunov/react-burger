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
      <nav className={styles.header__navigation}>
        <div className={`${styles.header__item}` + " ml-5 mr-2 mb-4 mt-4"}>
          <BurgerIcon type="primary" />
          <h2 className="text text_type_main-default">Конструктор</h2>
        </div>
        <div className={`${styles.header__item}` + " ml-5 mr-2 mb-4 mt-4"}>
          <ListIcon type="primary" />
          <h2 className="text text_type_main-default">Лента заказов</h2>
        </div>
      </nav>
      <div className={styles.logo__container}><Logo /></div>
      <div className={`${styles.header__login}` + " ml-5 mr-2 mb-4 mt-4"}>
        <ProfileIcon type="primary" />
        <h2 className="text text_type_main-default">Личный кабинет</h2>
      </div>
    </header>
  );
}
