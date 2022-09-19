import "../styles/style.css";
import logo from "../assets/icon-left-font-monochrome-black.png";

export default function Footer() {
    return (
        <footer>
            <div id="nav-footer">
                <p>Mentions légales</p>
                <img src={logo} alt="Logo Groupomania" />
                <p>Contact</p>
            </div>

            <div id="copyright">
                <p>Copyright Groupomania group 2022</p>
            </div>
        </footer>
    );
}
