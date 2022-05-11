import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useDocumentTitle } from "../../utils/usDocumentTitle";

export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [password, setPassword] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [termsError, setTermsError] = useState("");

    const { error, signUpUser } = useAuth();
    useDocumentTitle("Signup")

    const emailMatchPattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const signupHandler = () => {
        if (!email.match(emailMatchPattern)) {
            setEmailError(true);
            return;
        } else {
            setEmailError(false);
        }

        if (password.length < 8) {
            setPasswordError(true);
            return;
        } else {
            setPasswordError(false);
        }

        if (!acceptTerms) {
            setTermsError(true);
            return;
        } else {
            setTermsError(false);
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
                            className={
                                "input-field" +
                                (emailError ? " input-color-error" : " ")
                            }
                            onChange={(e) => setEmail(e.target.value)}
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
                            className={
                                "input-field" +
                                (passwordError ? " input-color-error" : " ")
                            }
                            onChange={(e) => setPassword(e.target.value)}
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
                                onChange={() => setAcceptTerms((s) => !s)}
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
                            {error.response.data.errors[0]}
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
