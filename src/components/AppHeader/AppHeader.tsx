import React, { FunctionComponent } from "react";
import styles from "./AppHeader.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export const AppHeader:FunctionComponent = () => { 
  const userLogin:Boolean = useSelector((store:any) => store.authentification.isLogin);
  return (
    <header className={styles.header}>
      <nav className={styles.header__navigation}>
        <NavLink className={styles.link_text} to="/">
          {({ isActive }) => (
            <div className={`${styles.header__item}` + " ml-5 mr-2 mb-4 mt-4"}>
              <BurgerIcon type={isActive ? "primary" : "secondary"} />
              <h2
                className={
                  isActive
                    ? "text text_type_main-default"
                    : "text text_type_main-default text_color_inactive"
                }
              >
                Конструктор
              </h2>
            </div>
          )}
        </NavLink>

        <NavLink className={styles.link_text} to="/orders">
          {({ isActive }) => (
            <div className={`${styles.header__item}` + " ml-5 mr-2 mb-4 mt-4"}>
              <ListIcon type={isActive ? "primary" : "secondary"} />
              <h2
                className={
                  isActive
                    ? "text text_type_main-default"
                    : "text text_type_main-default text_color_inactive"
                }
              >
                Лента заказов
              </h2>
            </div>
          )}
        </NavLink>
      </nav>
      <div className={styles.logo__container}>
        <Logo />
      </div>

      <NavLink
        to={userLogin ? "/profile" : "/login"}
        className={`${styles.header__login}` + " ml-5 mr-2 mb-4 mt-4"}
      >
        {({ isActive }) => (
          <>
            <ProfileIcon type={isActive ? "primary" : "secondary"} />
            <h2
              className={
                isActive
                  ? "text text_type_main-default"
                  : "text text_type_main-default text_color_inactive"
              }
            >
              {userLogin ? "Личный кабинет" : "Войти"}
            </h2>
          </>
        )}
      </NavLink>
    </header>
  );
}
