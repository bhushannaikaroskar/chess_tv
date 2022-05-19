import React, { useReducer } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context";
import { useDocumentTitle } from "../../utils";
import "./authpage.css"

const guestCredentialsStyle = {
    backgroundColor: "transparent",
    border: 0,
    cursor:"pointer"
}

const emailMatchPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const initialObject = {
    email:"",
    password:"",
    emailError:false,
    passwordError:false,
    showPassword:false
}

const reducer = (state,action) => {
    switch(action.type){
        case "EMAIL":
            return {...state,email: action.payload.email}
        case "PASSWORD":
            return {...state,password: action.payload.password}
        case "EMAIL_ERROR":
            return {...state,emailError: action.payload.error}
        case "PASSWORD_ERROR":
            return {...state,passwordError: action.payload.error}
        case "SHOW_PASSWORD":
            return {...state,showPassword: action.payload.flag}
        default:
            return state;
    }
}

export default function LoginPage() {
    const [state,dispatch] = useReducer(reducer,initialObject);
    const {email,emailError,password,passwordError,showPassword} = state;

    useDocumentTitle("Login");

    const { error, loginUser } = useAuth();

    const useGuestCredentials = () => {
        dispatch({type:"EMAIL",payload:{email:"guestuser@gmail.com"}});
        dispatch({type:"PASSWORD",payload:{password:"guestcredentials123"}});
        setTimeout(
            () => loginUser("guestuser@gmail.com", "guestcredentials123"),
            100
        );
    };

    const loginHandler = () => {
        if (!email.match(emailMatchPattern)) {
            dispatch({type:"EMAIL_ERROR",payload:{error:true}});
            return;
        } else {
            dispatch({type:"EMAIL_ERROR",payload:{error:false}});;
        }

        if (password.length < 8) {
            dispatch({type:"PASSWORD_ERROR",payload:{error:true}});;
            return;
        } else {
            dispatch({type:"PASSWORD_ERROR",payload:{error:false}});;
        }

        loginUser(email, password);
    };

    return (
        <main className="grand-main">
            <div className="flex justify-content-center align-items-center h-100">
                <div className="auth-container ">
                    <h2 className="text-align-center font-black">Login</h2>
                    <div className="input-wrapper p-y-1 w-100">
                        <label htmlFor="email" className="input-label fw-600">
                            Email:
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            className={`input-field ${emailError?"input-color-error":""}`}
                            onChange={(e) => dispatch({type:"EMAIL",payload:{email:e.target.value}})}
                        />
                        {emailError && (
                            <span className="input-message">
                                Please enter valid email
                            </span>
                        )}
                    </div>
                    <div className="input-wrapper p-y-1 w-100">
                        <label
                            htmlFor="password"
                            className="input-label fw-600"
                        >
                            Password:
                        </label>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            className={`input-field ${passwordError?"input-color-error":""}`}
                            onChange={(e) => dispatch({type:"PASSWORD",payload:{password:e.target.value}})}
                        />
                        {passwordError && (
                            <span className="input-message">
                                Please enter password more that 8 characters
                            </span>
                        )}
                    </div>
                    <div className="flex justify-content-between w-100 p-y-1">
                        <label className="font-small fw-500 flex align-items-center">
                            <input
                                type="checkbox"
                                name="show-password"
                                checked={showPassword}
                                onChange={() => dispatch({type:"SHOW_PASSWORD",payload:{flag:!showPassword}})}
                            />{" "}
                            <span className="p-0_5"> </span> Show Password
                        </label>
                        <button
                            style={guestCredentialsStyle}
                            className="btn-link-primary button-link fw-500"
                            onClick={useGuestCredentials}
                        >
                            Use Test Credentials
                        </button>
                    </div>
                    <div className="p-1"></div>
                    <button
                        className="btn btn-primary w-100"
                        onClick={loginHandler}
                    >
                        Login
                    </button>
                    {error && (
                        <div className="font-error font-small">
                            {error}
                        </div>
                    )}
                    <div className="flex justify-content-center w-100 p-y-1 text-align-center">
                        <NavLink
                            className="btn btn-link-secondary"
                            to="/signup"
                        >
                            Create Account{" "}
                            <span className="material-icons font-x-large">
                                chevron_right
                            </span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </main>
    );
}
