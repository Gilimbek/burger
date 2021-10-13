import React, { useState, useEffect, Suspense } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import css from "./style.module.css";
import Toolbar from "../../components/Toolbar";
import SideBar from "../../components/SideBar";
import { Route, Switch } from "react-router-dom";
import ShippingPage from "../ShippingPage";
import Burger from "../../components/Burger";
import LoginPage from "../LoginPage";
import Logout from "../../components/Logout";
import * as actions from "../../redux/actions/loginActions";
import * as signupActions from "../../redux/actions/signupActions";
import { BurgerStore } from "../../context/BurgerContext";


const BurgerPage = React.lazy(() => {
  return import("../BurgerPage");
})
const OrderPage = React.lazy(() => {
  return import("../OrderPage");
})
const SignupPage = React.lazy(() => {
  return import("../SignupPage");
})


const App = props => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSideBar = () => {
    setShowSidebar(prevShowSideBar => !prevShowSideBar);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expireDate = new Date(localStorage.getItem("expireDate"));
    const refreshToken = localStorage.getItem("refreshToken");
    if (token) {
      if (expireDate > new Date()) {
        // Hugatsaa n duusaagui token bna, avto login hiine
        props.autoLogin(token, userId);

        // Token huchingui bolohod uldej baigaa hugatsaag tootsoolj Ter hugatsaanii daraa avtomataar logout hiine
        props.autoLogoutAfterMillisec(expireDate.getTime() - new Date().getTime());
      } else {
        // Token hugatsaa n duussan bna, logout hiine
        props.logout();

      }

    }
  }, []);

  return (
    <div>
      <Toolbar toggleSideBar={toggleSideBar} />

      <SideBar
        showSidebar={showSidebar} toggleSideBar={toggleSideBar}
      />

      <main className={css.Content}>
        <BurgerStore>
          <Suspense fallback={<div>Түр хүлээнэ үү...</div>}>
            {props.userId ? (
              <Switch>
                <Route path="/logout" component={Logout} />
                <Route path="/orders" component={OrderPage} />
                <Route path="/ship" component={ShippingPage} />
                <Route path="/" component={BurgerPage} />
              </Switch>

            ) : (
              <Switch>
                <Route path="/signup" component={SignupPage} />
                <Route path="/login" component={LoginPage} />
                <Redirect to="/login" />
              </Switch>
            )}
          </Suspense>
        </BurgerStore>
      </main>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.signupReducer.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    autoLogin: (token, userId) =>
      dispatch(actions.loginUserSuccess(token, userId)),
    logout: () => dispatch(signupActions.logout()),
    autoLogoutAfterMillisec: () =>
      dispatch(signupActions.autoLogoutAfterMillisec())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
