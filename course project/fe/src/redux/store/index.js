import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authenticate from "../slice/authenticate";
import { reloadCurrentUserContext } from "../slice/authenticate/action";

const rootReducer = combineReducers({
    authenticate 
})

const store = configureStore({
    reducer: rootReducer
})

store.dispatch(reloadCurrentUserContext())

export default store
