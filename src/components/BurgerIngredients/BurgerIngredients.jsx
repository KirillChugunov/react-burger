import React from "react";
import styles from "./BurgerIngredients.module.css";
import { Tab, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";


export function BurgerIngredients(props) {
     return (<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
     {props.data.map((element) => {
     return (
     <ConstructorElement
    text={element.name}
    price={element.price}
    thumbnail={element.image} />)})} 
</div>)
}
