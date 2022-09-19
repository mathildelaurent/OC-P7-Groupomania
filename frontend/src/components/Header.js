import "../styles/style.css";
import logo from "../assets/icon-left-font.png";

export default function Header() {
    return (
        <header>
            <img src={logo} alt="Logo Groupomania" />
        </header>
    );
}
