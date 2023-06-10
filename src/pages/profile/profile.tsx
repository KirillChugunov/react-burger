import style from "./profile.module.css";
import { FunctionComponent } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { sendLogOut } from "../../services/actions/authentification";
import { deleteCookie } from "../../services/Coockie/deleteCoockie";
import { useDispatch } from "../../hooks/customDispatch";

export const ProfilePage: FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    deleteCookie("refreshToken");
    navigate("/");
    dispatch(sendLogOut());
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className={style.profile_container}>
      <div className={`${style.links_container}` + " mr-15"}>
        <div className={"mb-20"}>
          <div className="mt-6">
            <NavLink
              to="/profile"
              end
              className={({ isActive }) =>
                isActive
                  ? `${style.link}` + " text text_type_main-medium"
                  : `${style.link_inactive}` +
                    " text text_type_main-medium text_color_inactive"
              }
            >
              Профиль
            </NavLink>
          </div>
          <div className="mt-6">
            <NavLink
              to="/profile/orders"
              caseSensitive
              className={({ isActive }) =>
                isActive
                  ? `${style.link}` + " text text_type_main-medium"
                  : `${style.link_inactive}` +
                    " text text_type_main-medium text_color_inactive"
              }
              end
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
