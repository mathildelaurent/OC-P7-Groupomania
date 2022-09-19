import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Login(props) {
    const { handleLogin } = props;
    // const [user, setUser] = useState({
    //   email: "",
    // password: "",
    //});

    const { user } = useContext(AuthContext);
    const { storedUsers } = useContext(AuthContext);
    console.log(user);
    console.log(storedUsers);
    const { userLogged } = useContext(AuthContext);

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
                    console.log("t'as gouru !");
                    alert("L'e-mail et/ou le mot de passe sont incorrects !");
                } else {
                    console.log(datas);
                    userLogged(datas);

                    //  handleLogin(datas);
                    // setUser({
                    //   email: "",
                    // password: "",
                    // });
                    window.location.href = "./welcome";
                }
            });
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        //   setUser({ ...user, [name]: value });
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
                        type="text"
                        name="password"
                        id="password"
                        value={user.password}
                        onChange={(evt) => handleChange(evt)}
                        required
                    />
                </div>
                <button type="submit" id="connexion-form__submit">
                    Se connecter
                </button>
            </form>
        </section>
    );
}
