import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authenticate from "../slice/authenticate";

const rootReducer = combineReducers({
    authenticate 
})

const store = configureStore({
    reducer: rootReducer
})

export default store
