export default function Signup() {
    function handleSubmit(evt) {
        evt.preventDefault();
        fetch("http://localhost:3000/api/auth/signup", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                lastname: document.getElementById("lastname").value,
                firstname: document.getElementById("firstname").value,
                job: document.getElementById("job").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
            }),
        })
            .then((response) => {
                return response.json();
                //  if (datas.ok === true) {
                //  window.location.href = "/login";
                //} else {
                //  if (datas.status === 409) {
                //    alert("Ce compte existe déjà");
                //}
                //if (datas.status === 400) {
                //  alert("Le mot de passe n'est pas assez fort !");
                // }
                // }
            })
            .then((datas) => {
                console.log(datas);
                window.location.href = "/login";
            });
    }

    return (
        <section id="connexion">
            <h2>Inscrivez-vous !</h2>
            <form
                method="POST"
                className="connexion-form"
                onSubmit={(evt) => handleSubmit(evt)}
            >
                <div className="connexion-form_item">
                    <label htmlFor="lastname">Nom : </label>
                    <input type="text" name="lastname" id="lastname" required />
                    <p id="lastNameError"></p>
                </div>

                <div className="connexion-form_item">
                    <label htmlFor="firstname">Prénom : </label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        required
                    />
                    <p id="firstNameError"></p>
                </div>

                <div className="connexion-form_item">
                    <label htmlFor="job">Poste : </label>
                    <select name="job" id="job" required>
                        <option value="select">Sélectionnez votre poste</option>
                        <option value="reception">Accueil</option>
                        <option value="purchasing">Achats</option>
                        <option value="administering">Administration</option>
                        <option value="engineering">Bureau d'Etudes</option>
                        <option value="sales">Commercial</option>
                        <option value="accounting">Comptabilité</option>
                        <option value="direction">Direction</option>
                        <option value="project">Projet</option>
                        <option value="quality">Qualité</option>
                        <option value="human-ressource">
                            Ressources Humaines
                        </option>
                        <option value="factory">Usine</option>
                    </select>
                </div>

                <div className="connexion-form_item">
                    <label htmlFor="email">E-mail : </label>
                    <input type="email" name="email" id="email" required />
                    <p id="emailError"></p>
                </div>

                <div className="connexion-form_item">
                    <label htmlFor="password">Mot de passe : </label>
                    <input type="text" name="password" id="password" required />
                    <p id="passwordError"></p>
                </div>

                <div className="connexion-form_item">
                    <label htmlFor="passwordConfirmation">
                        Confirmation du mot de passe :{" "}
                    </label>
                    <input
                        type="text"
                        name="passwordConfirmation"
                        id="passwordConfirmation"
                        required
                    />
                    <p id="passwordConfirmationError"></p>
                </div>
                <button type="submit" id="connexion-form__submit">
                    S'inscrire
                </button>
            </form>
        </section>
    );
}
