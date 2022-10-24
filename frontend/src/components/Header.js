import "../styles/style.css";
import logo from "../assets/icon-left-font.png";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function Header() {
    const { storedUsers } = useContext(AuthContext);
    console.log(storedUsers);
    return (
        <header>
            <a href="/welcome">
                <img src={logo} alt="Logo Groupomania" />
            </a>
        </header>
    );
}
