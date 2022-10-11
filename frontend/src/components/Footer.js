import "../styles/style.css";
import logo from "../assets/icon-left-font-monochrome-black.png";

export default function Footer() {
    return (
        <footer>
            <div id="nav-footer">
                <a href="./mentionslegales">Mentions légales</a>
                <img src={logo} alt="Logo Groupomania" />
                <a href="mailto: contact@test.com">Contact</a>
            </div>

            <div id="copyright">
                <p>Copyright Groupomania group 2022</p>
            </div>
        </footer>
    );
}
