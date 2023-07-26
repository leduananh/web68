import axiosInstance from "../axiosInstance"
const authenticateApi = {}

authenticateApi.getMe = async () => {
    const { data } = await axiosInstance.get("/users/me")
    return data
}



export default authenticateApi