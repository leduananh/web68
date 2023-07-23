import { Button, Space } from "antd"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import authSelector from "../../redux/slice/authenticate/selector"

const NavBar = () => {
    const isAuthenticated = useSelector(authSelector.selectIsAuthenticate)

    return (
        <>
            <div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <h1 style={{
                        margin: "10px 10px"
                    }}>
                        Social Media App
                    </h1>

                    <Space align="center" style={{
                        width: "200px",
                        display: "flex",
                        justifyContent: "space-around"
                    }}>
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        {isAuthenticated ?
                            (<Link to="/logout">Logout</Link>) :
                            (<Link to="/login">Login</Link>)
                        }


                    </Space>
                </div>
            </div>
        </>
    )
}

export default NavBar