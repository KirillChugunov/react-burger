import {
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./profile.module.css";
import React from "react";
import { NavLink } from "react-router-dom";

export function ProfilePage() {
  const [value, setValue] = React.useState("value");
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const [value1, setValue1] = React.useState("bob@example.com");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const [value2, setValue2] = React.useState("password");
  const onChange2 = (e) => {
    setValue(e.target.value);
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
                  ? `${style.blue}` + " text text_type_main-medium"
                  : style.red + " text text_type_main-medium"
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
                  ? `${style.blue}` + " text text_type_main-medium"
                  : style.red + " text text_type_main-medium"
              }
            >
              История заказов
            </NavLink>
          </div>
          <div className="mt-6">
            <p className="text text_type_main-medium">Выход</p>
          </div>
        </div>
        <p className="text text_type_main-medium">Выход</p>
      </div>
      <div>
        <div className="mt-6">
          <Input
            type={"text"}
            placeholder={"placeholder"}
            onChange={(e) => setValue(e.target.value)}
            icon={"EditIcon"}
            value={value}
            name={"name"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />
        </div>
        <div className="mt-6">
          <EmailInput
            onChange={onChange}
            value={value}
            name={"email"}
            placeholder="Логин"
            isIcon={true}
            extraClass="mb-2"
          />
        </div>
        <div className="mt-6">
          <PasswordInput
            onChange={onChange}
            value={value}
            name={"password"}
            icon="EditIcon"
          />
        </div>
      </div>
    </div>
  );
}
