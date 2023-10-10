import { createSlice ,configureStore} from "@reduxjs/toolkit";

const initial={token:"",isok:false,data:null};

 const authSlice=createSlice({
name:'auth',
initialState:initial,
reducers:{
    gettoken(state,action) {
        state.isok=true;
         state.token=action.payload;

         },

    userdata(state,action) {
   state.isok=true;

    state.data=action.payload;
    },
    remove(state,action) {
        state.isok=false;
        state.token=0;
        state.data={};

    }
}
});

const store=configureStore({
    reducer:authSlice.reducer
});

export const authaction=authSlice.actions;
export default store;