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
    try{
        const {data} = await axios.request({
            method:"post",
            url:"/api/auth/login",
            headers: { accept: "*/*" },
            data: user
        })
        console.log(data)
        return data
        
    }catch(err){
        return thunkAPI.rejectWithValue(err.response.data)
    }
})

export const signup = createAsyncThunk("auth/signup",async (user, thunkAPI)=>{
    try{
        const {data} = await axios.request({
            method:"post",
            url:"/api/auth/signup",
            headers: { accept: "*/*" },
            data: user
        })
        return data
    }catch(err){
        return thunkAPI.rejectWithValue(err.response.data)
    }
})

const authSlice = createSlice({
    name:"auth",
    initialState:initialAuthState,
    reducers:{
        // verified: (state,action)=>{
        //     state.isAuthenticated = true;
        //     state.authToken = action.payload.token;
        //     state.user = action.payload.foundUser;
        // },
        // signupVerified: (state,action)=>{
        //     state.isAuthenticated = true;
        //     state.authtoken = action.payload.token;
        //     state.user = action.payload.createdUser
        // },
        logout:(state)=>{
            console.log("logout called")
            state.authToken = "";
            state.isAuthenticated = false;
            state.user = {...initialAuthState.user}
        }
    },
    extraReducers:{
        [login.fulfilled]:(state,action)=>{
            const { email, firstName, lastName, _id } =
                action.payload.foundUser;
            state.isAuthenticated = true;
            state.authToken = action.payload.encodedToken;
            state.user = { email, firstName, lastName, _id };
            successToast("login successful")
            console.log(action)
        },
        [login.rejected]:(state,action)=>{
            console.log(action)
            state.error = action.payload.errors[0] 
            errorToast("login failed")
        },
        [signup.fulfilled]:(state,action)=>{
            state.isAuthenticated = true;
            state.authToken = action.payload.encodedToken;
            state.user = action.payload.foundUser;
            successToast("signup successful")
            console.log(action.payload)
        },
        [signup.rejected]:(state,action)=>{
            console.log(action)
            state.error = action.payload.errors[0] 
            errorToast("signup failed")
        },
    }   
});

export const {logout} =  authSlice.actions;
console.log(logout)
export default authSlice.reducer;