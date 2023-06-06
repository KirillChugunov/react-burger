import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./profile.module.css";
import React, { ChangeEvent, FunctionComponent } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendLogOut } from "../../services/actions/authentification";
import { deleteCookie } from "../../services/Coockie/deleteCoockie";

export const ProfilePage: FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  const handleLogOut = () => {
    deleteCookie("refreshToken")
    navigate("/");
    dispatch(sendLogOut());
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className={style.profile_container}>
      <div className={"mr-15"}>
        <div className={"mb-20"}>
          <div className="mt-6">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? `${style.link}` + " text text_type_main-medium"
                  : `${style.link}` +
                    " text text_type_main-medium text_color_inactive"
              }
            >
              Профиль
            </NavLink>
          </div>
          <div className="mt-6">
            <NavLink
              to="/profile/orders"
              className={({ isActive }) =>
                isActive
                  ? `${style.link}` + " text text_type_main-medium"
                  : `${style.link_inactive}` +
                    " text text_type_main-medium text_color_inactive"
              }
            >
              История заказов
            </NavLink>
          </div>
          <div className="mt-6">
            <p
              className="text text_type_main-medium"
              onClick={() => handleLogOut()}
            >
              Выход
            </p>
          </div>
        </div>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <Outlet />
    </div>
  );
};
