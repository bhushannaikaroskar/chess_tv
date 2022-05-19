import React, { useReducer } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context";
import { useDocumentTitle } from "../../utils/usDocumentTitle";

const initialObject = {
    email:"",
    password:"",
    emailError:false,
    passwordError:false,
    acceptTerms:false,
    termsError:false
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
        case "ACCEPT_TERMS":
            return {...state,acceptTerms: action.payload.flag}
        case "TERMS_ERROR":
            return {...state,termsError: action.payload.flag}
        default:
            return state;
    }
}

export default function SignUpPage() {

    const [state,dispatch] = useReducer(reducer,initialObject);
    const {email,emailError,password,passwordError,acceptTerms,termsError} = state;

    const { error, signUpUser } = useAuth();
    useDocumentTitle("Signup")

    const emailMatchPattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const signupHandler = () => {
        if (!email.match(emailMatchPattern)) {
            dispatch({type:"EMAIL_ERROR",payload:{error:true}});
            return;
        } else {
            dispatch({type:"EMAIL_ERROR",payload:{error:false}});
        }

        if (password.length < 8) {
            dispatch({type:"PASSWORD_ERROR",payload:{error:true}});
            return;
        } else {
            dispatch({type:"PASSWORD_ERROR",payload:{error:false}});
        }

        if (!acceptTerms) {
            dispatch({type:"TERMS_ERROR",payload:{flag:true}})
            return;
        } else {
            dispatch({type:"TERMS_ERROR",payload:{flag:false}})
        }

        signUpUser(email, password);
    };

    return (
        <main className="grand-main">
            <div className="flex justify-content-center align-items-center h-100">
                <div className="auth-container ">
                    <h2 className="text-align-center font-black">Signup</h2>
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
                        <label htmlFor="password" className="input-label fw-600">
                            Password:
                        </label>
                        <input
                            id="password"
                            type="password"
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
                                checked={acceptTerms}
                                onChange={(e) => dispatch({type:"ACCEPT_TERMS",payload:{flag:!acceptTerms}})}
                            />{" "}
                            <span className="p-0_5"> </span> I accept all Terms
                            and Conditions
                        </label>
                    </div>
                    {termsError && (
                        <p className="font-error font-small">
                            "Please accept all terms and conditions"
                        </p>
                    )}
                    <div className="p-1"></div>
                    <button
                        className="btn btn-primary w-100"
                        onClick={signupHandler}
                    >
                        Create New Account
                    </button>
                    {error && (
                        <div className="font-error font-small">
                            {error}
                        </div>
                    )}
                    <div className="flex justify-content-center w-100 p-y-1 text-align-center">
                        <NavLink to="/login" className="btn btn-link-secondary">
                            Already have an Account{" "}
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
