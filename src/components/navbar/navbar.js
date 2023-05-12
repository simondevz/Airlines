import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Button, Switch } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./navbar.scss";

function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <span className="text">Airlines</span>
            <span className="logout_container">
                <Switch className="dark_mode" checkedIcon={<LightModeIcon/>} icon={<DarkModeIcon />} />
                <Button
                    className="logout"
                    size="small"
                    onClick={() => {
                        localStorage.removeItem("airlines_user");
                        navigate("/");
                    }}
                    endIcon={<LogoutIcon />}
                >
                    logout
                </Button>
            </span>
        </nav>
    );
}

export default Navbar;
