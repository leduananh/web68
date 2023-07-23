import { createSelector } from "@reduxjs/toolkit";

const authSelector = {}

const selectAuthenticate = state => state.authenticate

authSelector.selectAccessToken = createSelector(
    selectAuthenticate,
    (authState) => authState.accessToken
)

authSelector.selectIsAuthenticate = createSelector(
    selectAuthenticate,
    (authState) => authState.isAuthenticated
)

export default authSelector

