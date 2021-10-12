import React, { Component } from "react";
import { connect } from "react-redux";
import css from "./style.module.css";
import Button from "../../components/General/Button";
import * as actions from "../../redux/actions/loginActions";
import Spinner from "../../components/General/Spinner";
import { Redirect } from "react-router-dom";


class Login extends Component {
    state = {
          email: "",
          password: ""  
    };

    changeEmail = e => {
        this.setState({ email: e.target.value });
    }

    changePassword = e => {
        this.setState({ password: e.target.value });
    }

    login = () => {
        this.props.login(this.state.email, this.state.password);
    };


    render() {
        return (
            <div className={css.Login}>
            {this.props.userId && <Redirect to="/orders" /> }
            <input onChange={this.changeEmail} type="text" placeholder="Имэйл хаяг" />
            <input onChange={this.changePassword} type="password" placeholder="Нууц үг" />

            {this.props.logginIn && <Spinner />}
            {this.props.firebaseError && (
                <div style={{color:'red'}}>{this.props.firebaseError} код нь : {this.props.firebaseErrorCode}
                </div>
            )}
            <Button text="ЛОГИН" btnType="Success" daragdsan={this.login} />
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        logginIn: state.signupReducer.logginIn,
        firebaseError: state.signupReducer.firebaseError,
        firebaseErrorCode: state.signupReducer.firebaseErrorCode,
        userId: state.signupReducer.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) => (dispatch(actions.loginUser(email, password)))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);