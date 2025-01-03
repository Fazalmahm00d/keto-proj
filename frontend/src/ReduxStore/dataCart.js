import { createSlice } from "@reduxjs/toolkit";


const dataSlice=createSlice({
    name:"Data Cart",
    initialState:{
        cartItems:[],
    },
    reducers:{
        setCartArr(state,actions){
            state.cartItems=actions.payload;
        }
    }

})
export const dataAction=dataSlice.actions

export const dataReducer=dataSlice.reducer;