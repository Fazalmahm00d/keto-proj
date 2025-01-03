import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Authenticate";
import { dataReducer } from "./dataCart";


const store=configureStore({
    reducer:{
        authReducer,
        dataReducer
    }
})

export default store;