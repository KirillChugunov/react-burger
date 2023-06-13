import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./ProfileInputs.module.css";
import React, { ChangeEvent, FunctionComponent } from "react";
import { setUserInfo } from "../../services/actions/authentication";
import { useDispatch } from "../../hooks/customDispatch";
import { useSelector } from "../../hooks/customUseSelector";

export const ProfileInputs: FunctionComponent = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((store) => store.authentication);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [name, setName] = React.useState<string>(userInfo.user.name);
  const [email, setEmail] = React.useState<string>(userInfo.user.email);
  const [password, setPassword] = React.useState<string>("");
  const [showButtons, setShowButtons] = React.useState<Boolean>(false);

  function handleChange(
    event: ChangeEvent<HTMLInputElement>,
    setter: Function
  ) {
    setter(event.target.value);
    setShowButtons(true);
  }

  function handleSave(e:React.FormEvent<HTMLFormElement> ,email: string, name: string, password: string) {
    e.preventDefault();
    dispatch(setUserInfo(email, name, password));
    setShowButtons(false);
  }

  function handleCancel(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setName(userInfo.user.name);
    setEmail(userInfo.user.email);
    setPassword("");
    setShowButtons(false);
  }

  return (
    <div>
      <form onSubmit={(e) =>handleSave(e, email, name, password)} onReset={(e) => handleCancel(e)}>
      <div className={`${style.input_container}` + " mt-6"}>
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
            htmlType="reset"
            type="secondary"
            size="medium"
           >
            Отмена
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
          >
            Сохранить
          </Button>
        </div>
      ) : null}
      </form>
    </div>
  );
};
