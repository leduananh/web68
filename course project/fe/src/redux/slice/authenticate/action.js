import { failAuthenticated, successAuthenticated } from "."
import authenticateApi from "../../../api/authentication"

export const login = credential => async dispatch => {
    const { token } = await authenticateApi.login(credential)

    localStorage.setItem("token", token)
    
    dispatch(successAuthenticated(token))
}

export const logout = _ => dispatch => {
    localStorage.removeItem("token")
    dispatch(failAuthenticated())
}