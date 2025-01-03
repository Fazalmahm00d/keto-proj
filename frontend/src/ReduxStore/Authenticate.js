import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const authSlice=createSlice({
    name:"Authenticate",
    initialState:{
        isEmail:null,
        isAuthenticate:Cookies.get('authToken')
    },
    reducers:{
        logIn(state){
            state.isEmail=true;
            console.log("log in executed in reducer")
        },
        logOut(state){
            state.isEmail=false;
        },
        changeEmailValue(state,actions){
            state.isEmail=actions.payload;
        },
        changeTokenValue(state,actions){
            state.isAuthenticate=actions.payload
        }
    }

})
export const authAction=authSlice.actions

export const authReducer=authSlice.reducer