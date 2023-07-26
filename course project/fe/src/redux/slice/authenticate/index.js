import { createSlice } from "@reduxjs/toolkit";


const name = "authentication"
const initialState = {
    accessToken: null,
    isAuthenticated: false,
    currentUser: null
}

const reducers = {
    successAuthenticated: (authenticationStateData, action) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        authenticationStateData.accessToken = action.accessToken
        authenticationStateData.currentUser = action.currentUser
        authenticationStateData.isAuthenticated = true
    },
    failAuthenticated: (authenticationStateData) => {
        authenticationStateData.accessToken = null
        authenticationStateData.isAuthenticated = false
        authenticationStateData.currentUser = null
    }
}

const authenticationSlice = createSlice({
    name,
    initialState,
    reducers
})

// Action creators are generated for each case reducer function
export const { successAuthenticated, failAuthenticated } = authenticationSlice.actions

export default authenticationSlice.reducer