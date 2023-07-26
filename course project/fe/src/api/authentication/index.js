import axiosInstance from "../axiosInstance"
const authenticateApi = {}

authenticateApi.register = async () => {
    //  axios
    //   axios.get(`${api_config.baseUrl}api/auth/register`)
}

authenticateApi.login = async (credential) => {
    const { data } = await axiosInstance.post("/auth/login", credential)
    return data
}

authenticateApi.isTokenValid = async (accessToken) => {
    const { data } = await axiosInstance.post("/auth/isTokenValid", {accessToken})
    return data
}

export default authenticateApi