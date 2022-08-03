import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/auth/authSlice";

console.log(authReducer)

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
