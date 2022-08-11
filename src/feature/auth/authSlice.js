import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorToast, successToast } from "../../utils";


const initialAuthState = {
    isAuthenticated: false,
    authToken: "",
    user: {
        firstName: "",
        lastName: "",
        email: "",
    },
    error:""
};

export const login = createAsyncThunk("auth/login",async(user, thunkAPI)=>{
    const {theme} = thunkAPI.getState().theme
    try{
        const {data} = await axios.request({
            method:"post",
            url:"/api/auth/login",
            headers: { accept: "*/*" },
            data: user
        })
        successToast("login successful",theme)
        return data
        
    }catch(err){
        errorToast("login failed",theme)
        return thunkAPI.rejectWithValue(err.response.data)
    }
})

export const signup = createAsyncThunk("auth/signup",async (user, thunkAPI)=>{
    const {theme} = thunkAPI.getState().theme
    try{
        const {data} = await axios.request({
            method:"post",
            url:"/api/auth/signup",
            headers: { accept: "*/*" },
            data: user
        })
        successToast("signup successful",theme)
        return data
    }catch(err){
        errorToast("signup failed",theme)
        return thunkAPI.rejectWithValue(err.response.data)
    }
})

export const verifyUser = createAsyncThunk(
    "auth/verifyUser",
    async (_, thunkAPI) => {
      try {
        const res = await axios.request({
          method: "post",
          url: "/api/auth/verify",
          headers: {
            accept: "*/*",
          },
          data: { encodedToken: localStorage.getItem("chess-token") },
        });
        return res.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response);
      }
    }
  );

const authSlice = createSlice({
    name:"auth",
    initialState:initialAuthState,
    reducers:{
        logout:(state)=>{
            state.authToken = "";
            state.isAuthenticated = false;
            state.user = {...initialAuthState.user};
            state.error = ""
            localStorage.removeItem("chess-token")
        }
    },
    extraReducers:{
        [login.fulfilled]:(state,action)=>{
            const { email, firstName, lastName, _id } =
                action.payload.foundUser;
            state.isAuthenticated = true;
            state.authToken = action.payload.encodedToken;
            state.user = { email, firstName, lastName, _id };
            state.error = "";
            localStorage.setItem("chess-token",action.payload.encodedToken)
        },
        [login.rejected]:(state,action)=>{
            state.error = action.payload.errors[0] 
        },
        [signup.fulfilled]:(state,action)=>{
            state.isAuthenticated = true;
            state.authToken = action.payload.encodedToken;
            state.user = action.payload.foundUser;
            state.error = "";
            localStorage.setItem("chess-token",action.payload.encodedToken)
        },
        [signup.rejected]:(state,action)=>{
            state.error = action.payload.errors[0] 
        },
        [verifyUser.fulfilled]:(state,action)=>{
            const {firstName,lastName,email,_id} = action.payload.user;
            state.isAuthenticated = true;
            state.authToken = localStorage.getItem("chess-token")
            state.user = { email, firstName, lastName, _id };
            state.error = "";
        },
    }   
});

export const {logout} =  authSlice.actions;
export default authSlice.reducer;