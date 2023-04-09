import React from "react";
import styles from "./BurgerConstructor.module.css";

// import { } from "@ya.praktikum/react-developer-burger-ui-components";

export function BurgerConstructor(props) {
  return (
    <div>{props.data.map((element) => {
      return (
      <div key = {element.id}>
      <img src = {element.image}></img>
      <h1>{element.name}</h1>
      <h1>{element.price}</h1>
      </div>)
    })}
    </div>
 )
}
