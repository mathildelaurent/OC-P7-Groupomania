import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Login(props) {
    const { handleLogin } = props;
    const { user } = useContext(AuthContext);
    const { storedUsers } = useContext(AuthContext);
    const { userLogged } = useContext(AuthContext);
    const [isVisible, setIsVisible] = useState(false);

    function handleSubmit(evt) {
        evt.preventDefault();
        fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
            }),
        })
            .then((response) => {
                return response.json();
            })
            .then((datas) => {
                if (!datas.userId) {
                    alert("L'e-mail et/ou le mot de passe sont incorrects !");
                } else {
                    userLogged(datas);
                    window.location.href = "./welcome";
                }
            });
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        //   setUser({ ...user, [name]: value });
    }

    function handleVisible() {
        setIsVisible(!isVisible);
    }

    return (
        <section id="connexion">
            <h2>Connectez-vous !</h2>
            <form
                method="POST"
                className="connexion-form"
                onSubmit={(evt) => handleSubmit(evt)}
            >
                <div className="connexion-form_item">
                    <label htmlFor="email">E-mail : </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={user.email}
                        onChange={(evt) => handleChange(evt)}
                        required
                    />
                    <p id="emailError"></p>
                </div>

                <div className="connexion-form_item">
                    <label htmlFor="password">Mot de passe : </label>
                    <input
                        type={isVisible ? "text" : "password"}
                        name="password"
                        id="password"
                        value={user.password}
                        onChange={(evt) => handleChange(evt)}
                        required
                    />
                    <i
                        className={
                            isVisible
                                ? "fa-solid fa-eye"
                                : "fa-solid fa-eye-slash"
                        }
                        onClick={() => handleVisible()}
                    ></i>
                </div>
                <button type="submit" id="connexion-form__submit">
                    Se connecter
                </button>
            </form>
        </section>
    );
}
