import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
// import { useDocumentTitle } from "../../utils";
import "./authpage.css"

const guestCredentialsStyle = {
    backgroundColor: "transparent",
    border: 0,
    cursor:"pointer"
}

const emailMatchPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // useDocumentTitle("Login")

    const { error, loginUser } = useAuth();

    const useGuestCredentials = () => {
        setEmail("guestuser@gmail.com");
        setPassword("guestcredentials123");
        setTimeout(
            () => loginUser("guestuser@gmail.com", "guestcredentials123"),
            100
        );
    };

    const loginHandler = () => {
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
                                checked={showPassword}
                                onChange={() => setShowPassword((s) => !s)}
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
                            {error.response.data.errors[0]}
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
