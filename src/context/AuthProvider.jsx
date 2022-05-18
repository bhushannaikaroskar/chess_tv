import axios from "axios";
import { createContext, useContext, useReducer, useState } from "react";
import { errorToast, successToast } from "../utils";
import { useTheme } from "./ThemeProvider";

const AuthContext = createContext();

const initialAuthState = {
    isAuthenticated: false,
    authToken: "",
    user: {
        firstName: "",
        lastName: "",
        email: "",
    },
};

export default function AuthProvider({ children }) {
    let email,firstName,lastName,_id;
    const authReducer = (state, action) => {
        switch (action.type) {
            case "VERIFIED":
                ({ email, firstName, lastName, _id } =
                    action.payload.foundUser);
                return {
                    ...state,
                    isAuthenticated: true,
                    user: { email, firstName, lastName, _id },
                    authToken: action.payload.token,
                };
            case "SIGNUP_VERIFIED":
                ({email,firstName,lastName,_id} = action.payload.createdUser);
                return {
                    ...state,
                    isAuthenticated: true,
                    user:{email,firstName,lastName,_id},
                    authToken: action.payload.token,

                };
            case "RESET":
                return { ...initialAuthState };
            default:
                return state;
        }
    };

    const [auth, dispatchAuth] = useReducer(authReducer, initialAuthState);
    const [error,setError] = useState();
    const {theme} = useTheme()

    const loginUser = (email, password) => {
        axios
            .request({
                method: "post",
                url: "/api/auth/login",
                headers: { accept: "*/*" },
                data: {
                    email: email,
                    password: password,
                },
            })
            .then((res) => {
                dispatchAuth({
                    type: "VERIFIED",
                    payload: { token: res.data.encodedToken, ...res.data },
                });
                successToast("Logged In",theme)
                setError("")
            })
            .catch((err) => {
                dispatchAuth({ type: "RESET" });
                errorToast("There was some error while logging in",theme)
                setError(err.response.data.errors[0])
            });
    };

    const signUpUser = async (email, password) => {
        await axios
            .request({
                method: "post",
                url: "/api/auth/signup",
                data: {
                    email: email,
                    password: password,
                },
            })
            .then((res) => {
                dispatchAuth({
                    type: "SIGNUP_VERIFIED",
                    payload: { token: res.data.encodedToken,...res.data },
                });
                successToast("Signin Successful",theme)
                setError("")
            })
            .catch((err) => {
                dispatchAuth({ type: "RESET" });
                errorToast("There was some error in signing",theme)
                setError(err.response.data.errors[0])
            });
    };

    const logout = () => {
        dispatchAuth({ type: "RESET" });
        successToast("Successfully logged out",theme)
    };

    return (
        <AuthContext.Provider value={{ auth, loginUser, signUpUser, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
