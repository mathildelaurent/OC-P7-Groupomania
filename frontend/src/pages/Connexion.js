import "../styles/style.css";
import { NavLink } from "react-router-dom";

export default function Connexion() {
    return (
        <section id="connexion">
            <div id="presentation">
                <h1>
                    Bienvenue dans le réseau social <span>Groupomania</span> !
                </h1>
                <p>
                    Un espace dédié à la communication et à l'échange
                    <br />
                    Un espace, qui vous est dédié !
                </p>
            </div>

            <div id="choice">
                <p className="choice-btn">
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            isActive ? "activeLink" : undefined
                        }
                    >
                        Se connecter
                    </NavLink>
                </p>
                <p className="choice-btn">
                    <NavLink
                        to="/signup"
                        className={({ isActive }) =>
                            isActive ? "activeLink" : undefined
                        }
                    >
                        S'inscrire
                    </NavLink>
                </p>
            </div>

            <div id="suggestions">
                <ul>
                    <li>
                        Retrouvez-nous lors de nos séminaires de Team Building
                    </li>
                    <li>Echangez vos idées</li>
                    <li>
                        Faites connaissance avec des collègues d'autres régions
                    </li>
                    <li>
                        Soyez informés des dernières actualités de{" "}
                        <span>Groupomania</span>
                    </li>
                    <li>
                        Une idée ou une suggestion pour améliorer davantage ce
                        réseau ? Ecrivez-nous depuis la rubrique "Contact"
                    </li>
                </ul>
            </div>
        </section>
    );
}
