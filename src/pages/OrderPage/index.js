import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import axios from "../../axios-orders";
import css from "./style.module.css";
import Spinner from "../../components/General/Spinner";
import Order from "../../components/Order";
import * as actions from "../../redux/actions/orderActions";
import BurgerContext from "../../context/BurgerContext";


const OrderPage = props => {
  useEffect(() => {
    props.loadOrders(props.userId);
  }, [])

  const appData = useContext(BurgerContext);

  return (
    <div>
      {"" + appData}
      {props.loading ? (
        <Spinner />
      ) : (
        props.orders.map(el => <Order key={el[0]} order={el[1]} />)
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    orders: state.orderReducer.orders,
    loading: state.orderReducer.loading,
    userId: state.signupReducer.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadOrders: userId => dispatch(actions.loadOrders(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
