import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Card } from "@mui/material";
import "./login.scss";

function Login() {
    // Add alert for incorrect username and/or password
    const navigate = useNavigate();
    const [state, setState] = useState({
        username: "",
        password: "",
    });

    return (
        <form className="login">
            <Card className="card">
                <span className="text">LOGIN</span>
                <TextField
                    id="username"
                    className="username"
                    label="Username"
                    variant="standard"
                    value={state.username}
                    onChange={(event) =>
                        onChange(event, "username", state, setState)
                    }
                />
                <TextField
                    id="password"
                    className="password"
                    label="Password"
                    variant="standard"
                    value={state.password}
                    onChange={(event) =>
                        onChange(event, "password", state, setState)
                    }
                />
                <Button
                    className="loginButton"
                    variant="contained"
                    onClick={(event) => {
                        if (
                            state.username === "Admin" &&
                            state.password === "12345678"
                        ) {
                            localStorage.setItem(
                                "airlines_user",
                                JSON.stringify(state)
                            );
                            navigate("/");
                        }
                    }}
                >
                    Login
                </Button>
            </Card>
        </form>
    );
}

export function onChange(event, key, state, setState) {
    setState({
        ...state,
        [key]: event.target.value,
    });
}

export default Login;
