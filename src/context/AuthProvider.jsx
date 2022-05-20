import axios from "axios";
import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react";
import { errorToast, successToast } from "../utils";
import { authReducer } from "./reducers";
import { initialAuthState } from "./reducers/authReducer";
import { useTheme } from "./ThemeProvider";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [auth, dispatchAuth] = useReducer(authReducer, initialAuthState);
    const [error, setError] = useState();
    const { theme } = useTheme();

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
                successToast("Logged In", theme);
                setError("");
            })
            .catch((err) => {
                dispatchAuth({ type: "RESET" });
                errorToast("There was some error while logging in", theme);
                setError(err.response.data.errors[0]);
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
                    payload: { token: res.data.encodedToken, ...res.data },
                });
                successToast("Signin Successful", theme);
                setError("");
            })
            .catch((err) => {
                dispatchAuth({ type: "RESET" });
                errorToast("There was some error in signing", theme);
                setError(err.response.data.errors[0]);
            });
    };

    const logout = () => {
        dispatchAuth({ type: "RESET" });
        successToast("Successfully logged out", theme);
    };

    useEffect(() => {
        if (auth.isAuthenticated) {
            localStorage.setItem("chess-tv-user-auth", JSON.stringify(auth));
        }
    }, [auth]);

    useEffect(() => {
        if (localStorage.getItem("chess-tv-user-auth")) {
            const storedState = JSON.parse(
                localStorage.getItem("chess-tv-user-auth")
            );

            if (storedState.authToken) {
                dispatchAuth({
                    type: "VERIFIED",
                    payload: {
                        token: storedState.authToken,
                        foundUser: storedState.user,
                    },
                });
            }
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{ auth, loginUser, signUpUser, logout, error }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
