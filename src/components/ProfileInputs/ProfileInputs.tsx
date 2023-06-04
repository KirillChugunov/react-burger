import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./ProfileInputs.module.css";
import React, { ChangeEvent, FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../services/actions/authentification";
import { requestUserInfoChange } from "../../services/Api/api";

export const ProfileInputs: FunctionComponent = () => {
  const dispatch: any = useDispatch();
  const userInfo = useSelector((store: any) => store.authentification);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [name, setName] = React.useState(userInfo.user.name);
  const [email, setEmail] = React.useState(userInfo.user.email);
  const [password, setPassword] = React.useState("password");
  const [showButtons, setShowButtons] = React.useState(false);

  function handleChange(
    event: ChangeEvent<HTMLInputElement>,
    setter: Function
  ) {
    setter(event.target.value);
    setShowButtons(true);
  }

  function handleSave(email: string, name: string, password: string) {
    dispatch(setUserInfo(email, name, password));
    setShowButtons(false);
  }

  function handleCancel() {
    setName(userInfo.user.name);
    setEmail(userInfo.user.email);
    setPassword("password");
    setShowButtons(false);
  }

  return (
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
  );
};
