import { failAuthenticated, successAuthenticated } from "."
import authenticateApi from "../../../api/authentication"

const TOKEN_NAME = "token"

export const login = credential => async dispatch => {
    const { token } = await authenticateApi.login(credential)

    localStorage.setItem(TOKEN_NAME, token)

    dispatch(successAuthenticated(token))
}

export const logout = _ => dispatch => {
    localStorage.removeItem(TOKEN_NAME)
    dispatch(failAuthenticated())
}

export const reloadCurrentUserContext = _ => async dispatch => {
    const token = localStorage.getItem(TOKEN_NAME)

    if (!token) {
        return
    }

    try {
        await authenticateApi.isTokenValid(token)
    } catch (error) {
        logout()
        return;
    }
    
    dispatch(successAuthenticated(token))
}