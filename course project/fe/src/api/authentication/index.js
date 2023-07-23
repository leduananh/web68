import axiosInstance from "../axiosInstance"
const authenticateApi = {}

authenticateApi.register = async () => {
    //  axios
    //   axios.get(`${api_config.baseUrl}api/auth/register`)
}

authenticateApi.login = async (credential) => {
    const {data} = await axiosInstance.post("/auth/login", credential)
    return data
}

authenticateApi.logout = async () => {
    // axiosInstance.get("http://localhost:4000/api/auth/register")
}


export default authenticateApi