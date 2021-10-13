import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import css from "./style.module.css";
import Button from "../General/Button";
import Spinner from "../General/Spinner";
import axios from "../../axios-orders";
import { withRouter } from "react-router-dom";
import * as actions from "../../redux/actions/orderActions";

const ContactData = (props) => {
  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [street, setStreet] = useState();

  const dunRef = useRef();

  useEffect(() => {
    if (props.newOrderStatus.finished && !props.newOrderStatus.error) {
      props.history.replace("/orders");
    }

    return () => {
      // Tseverlegch function : Zahialgiig nutsaagaad khoosolno. Daraachiin zahialgad beltgene gesen ug.
      props.clearOrder();
    };
  }, [props.newOrderStatus.finished]);

  const changeName = e => {
    if (dunRef.current.style.color === "red")
      dunRef.current.style.color = "green";
    else dunRef.current.style.color = "red";
    setName(e.target.value);
  };
  const changeStreet = e => {
    setStreet(e.target.value);
  };
  const changeCity = e => {
    setCity(e.target.value);
  };

  const saveOrder = () => {
    console.log('PROPS: ', props);
    const newOrder = {
      userId: props.userId,
      orts: props.ingredients,
      dun: props.price,
      hayag: {
        name: name,
        city: city,
        street: street
      }
    };
    console.log('new order: ', newOrder);
    props.saveOrderAction(newOrder);
  };

  return (
    <div className={css.ContactData}>
      <div ref={dunRef}>
        <strong style={{ fontSize: '16px' }}>Дүн : {props.price}₮</strong>
      </div>
      <div>
        {props.newOrderStatus.error &&
          `Захиалгыг хадгалах явцад алдаа гарлаа : ${props.newOrderStatus.error}`}
      </div>
      {props.newOrderStatus.saving ? (
        <Spinner />
      ) : (
        <div>
          <h4>ТА ХҮРГЭЛТИЙН МЭДЭЭЛЛЭЭ ОРУУЛСНЫ ДАРАА ИЛГЭЭХ ТОВЧ АЖИЛЛАНА!</h4>
          <input
            onChange={changeName}
            type="text"
            name="name"
            placeholder="Таны нэр"
          />
          <input
            onChange={changeStreet}
            type="text"
            name="street"
            placeholder="Таны гэрийн хаяг"
          />
          <input
            onChange={changeCity}
            type="text"
            name="city"
            placeholder="Таны хот"
          />
          <Button
            disabled={!name || !city || !street}
            // disabled={true}
            text="ИЛГЭЭХ"
            btnType="Success"
            daragdsan={saveOrder}
          />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    price: state.burgerReducer.totalPrice,
    ingredients: state.burgerReducer.ingredients,
    newOrderStatus: state.orderReducer.newOrder,
    userId: state.signupReducer.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveOrderAction: newOrder => dispatch(actions.saveOrder(newOrder)),
    clearOrder: () => dispatch(actions.clearOrder())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactData));
