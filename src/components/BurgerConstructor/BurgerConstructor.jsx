import React from "react";
import styles from "./BurgerConstructor.module.css";
import {
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function BurgerConstructor(props) {
  const toggleModal = props.toggleModal;
  const [current, setCurrent] = React.useState("one");
  return (
    <div><div style={{ display: 'flex' }}>
    <Tab value="one" active={current === 'one'} onClick={setCurrent}>
      One
    </Tab>
    <Tab value="two" active={current === 'two'} onClick={setCurrent}>
      Two
    </Tab>
    <Tab value="three" active={current === 'three'} onClick={setCurrent}>
      Three
    </Tab>
  </div>
      <div>
        <div>
          <p className="text text_type_main-medium">Булки</p>
          <div style={{ border: "solid green", display: "flex" }}>
            {props.data.map((element) => {
              if (element.type === "bun") {
                return (
                  <div
                    style={{ border: "solid blue" }}
                    key={element._id}
                    onClick={() => {toggleModal(element)}}
                  >
                    <img src={element.image}></img>
                    <div style={{ border: "solid yellow" }}>
                      <CurrencyIcon type="primary" />
                      <p className="text text_type_digits-default">
                        {element.price}
                      </p>
                    </div>
                    <p className="text text_type_main-default">
                      {element.name}
                    </p>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div>
          <p className="text text_type_main-medium">Соусы</p>
          {props.data.map((element) => {
            if (element.type === "sauce") {
              return (
                <div key={element._id}>
                  <div>
                    <div>
                      <img src={element.image}></img>
                      <div>
                        <CurrencyIcon type="primary" />
                        <p className="text text_type_digits-default">
                          {element.price}
                        </p>
                      </div>
                      <p className="text text_type_main-default">
                        {element.name}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div>
          <p className="text text_type_main-medium">Начинки</p>
          {props.data.map((element) => {
            if (element.type === "main") {
              return (
                <div key={element._id}>
                  <div>
                    <div>
                      <img src={element.image}></img>
                      <div>
                        <CurrencyIcon type="primary" />
                        <p className="text text_type_digits-default">
                          {element.price}
                        </p>
                      </div>
                      <p className="text text_type_main-default">
                        {element.name}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      </div>
    
  );
}
