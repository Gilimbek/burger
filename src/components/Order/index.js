import React from "react";

import css from "./style.module.css";

const Order = props => {
  return (
    <div className={css.Order}>
      {props.order && (
        <div>
          <p>
            Орц : Гахайн мах : {props.order.orts.bacon}, Салад :{" "}
            {props.order.orts.salad}, Үхрийн мах : {props.order.orts.meet}, Бяслаг :{" "}
            {props.order.orts.cheese}
          </p>
          {(props.order && props.order.hayag && (props.order.hayag.name || props.order.street || props.order.hayag.city)) && (
            <p>
              Хаяг : {props.order.hayag.name} | {props.order.hayag.street} |
              {props.order.hayag.city}
            </p>
          )}
          <p>
            Үнийн дүн : <strong>{props.order.dun}₮</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default Order;
