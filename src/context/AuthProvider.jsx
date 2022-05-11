import axios from "axios";
import { createContext, useContext, useReducer } from "react";

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
                console.log(action.payload.foundUser);
                ({ email, firstName, lastName, _id } =
                    action.payload.foundUser);
                console.log(email, firstName, lastName, _id);
                return {
                    ...state,
                    isAuthenticated: true,
                    user: { email, firstName, lastName, _id },
                    authToken: action.payload.token,
                };
            case "SIGNUP_VERIFIED":
                // console.log(action.payload.foundUser)
                ({email,firstName,lastName,_id} = action.payload.createdUser);
                console.log(email,firstName,lastName,_id)
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
                console.log(res);

                dispatchAuth({
                    type: "VERIFIED",
                    payload: { token: res.data.encodedToken, ...res.data },
                });
                console.log("Logged in Successfully");
            })
            .catch((err) => {
                dispatchAuth({ type: "RESET" });
                console.log("There was some error while logginng in", err);
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
                console.log("Signin Successful");
                console.log(res)
            })
            .catch((err) => {
                dispatchAuth({ type: "RESET" });
                console.log("There was some error in signing",err);
            });
    };

    const logout = () => {
        dispatchAuth({ type: "RESET" });
        console.log("Successfully logged out.");
    };

    return (
        <AuthContext.Provider value={{ auth, loginUser, signUpUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
