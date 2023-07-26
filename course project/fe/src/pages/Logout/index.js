import { Form, Input } from "antd"
import { Button } from "antd/es/radio"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import authSelector from "../../redux/slice/authenticate/selector"
import { logout } from "../../redux/slice/authenticate/action"

const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    dispatch(logout())
    navigate("/")
    // return (<></>)
}

export default Logout