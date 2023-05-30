import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./profile.module.css";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  sendLogOut,
  setUserInfo,
} from "../../services/actions/authentification";
import { requestUserInfoChange } from "../../services/Api/api";

export function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((store) => store.authentification);
  const inputRef = React.useRef(null);
  const [name, setName] = React.useState(userInfo.user.name);
  const [email, setEmail] = React.useState(userInfo.user.email);
  const [password, setPassword] = React.useState("password");
  const [showButtons, setShowButtons] = React.useState(false);

  function handleChange(event, setter) {
    setter(event.target.value);
    setShowButtons(true);
  }

  function handleSave(email, name, password) {
    dispatch(setUserInfo(email, name, password));
    setShowButtons(false);
  }

  function handleCancel() {
    setName(userInfo.user.name);
    setEmail(userInfo.user.email);
    setPassword("password");
    setShowButtons(false);
  }



  const handleLogOut = () => {
    navigate("/");
    dispatch(sendLogOut());
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
      <div>
        <div className="mt-6">
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => handleChange(e, setName)}
            icon={"EditIcon"}
            value={name}
            name={"name"}
            error={false}
            ref={inputRef}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />
        </div>
        <div className="mt-6">
          <EmailInput
            onChange={(e) => handleChange(e, setEmail)}
            value={email}
            name={"email"}
            placeholder="Логин"
            isIcon={true}
            extraClass="mb-2"
          />
        </div>
        <div className="mt-6">
          <PasswordInput
            onChange={(e) => handleChange(e, setPassword)}
            value={password}
            name={"password"}
            icon="EditIcon"
          />
        </div>
        {showButtons ? (
          <div className={`${style.button_container}` + " mt-6"}>
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              onClick={() => handleCancel()}
            >
              Отмена
            </Button>
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={() => handleSave(email, name, password)}
            >
              Сохранить
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
