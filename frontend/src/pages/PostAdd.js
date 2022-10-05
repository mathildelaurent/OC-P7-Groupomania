import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default function PostAdd(props) {
    const { storedUsers } = useContext(AuthContext);
    console.log(storedUsers);

    const [post, setPost] = useState({
        title: "",
        content: "",
    });
    const [file, setFile] = useState();

    const formData = new FormData();

    formData.append("title", post.title);
    formData.append("content", post.content);
    formData.append("image", file);

    function handleSubmit(evt) {
        evt.preventDefault();

        axios({
            method: "POST",
            url: "http://localhost:3000/api/posts",
            data: formData,
            headers: {
                Authorization: `Bearer ${storedUsers.token}`,
            },
        })
            .then((response) => {
                return response;
            })
            .then(() => {
                window.location.href = window.location.href;
            });
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setPost({ ...post, [name]: value });
    }

    function handleChangeFile(evt) {
        console.log(evt);
        console.log(evt.target.files[0]);
        if (evt.target && evt.target.files[0]) {
            setFile(evt.target.files[0]);
        }
    }

    return (
        <section id="post-add">
            <div id="menu">
                <p className="btn-menu">
                    <NavLink
                        to="/welcome"
                        className={({ isActive }) =>
                            isActive ? "activeLink" : undefined
                        }
                    >
                        Accueil
                    </NavLink>
                </p>
                <p className="btn-menu">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "activeLink" : undefined
                        }
                    >
                        Se déconnecter
                    </NavLink>
                </p>
            </div>
            <h2>Créer une publication</h2>
            <form
                method="POST"
                id="creation-form"
                encType="multipart/form-data"
                onSubmit={(evt) => handleSubmit(evt)}
            >
                <div className="creation-form__item">
                    <label htmlFor="title">Titre :</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={post.title}
                        onChange={(evt) => handleChange(evt)}
                        required
                    />
                </div>

                <div className="creation-form__item">
                    <label htmlFor="content">Votre message :</label>
                    <textarea
                        name="content"
                        id="content"
                        cols="30"
                        rows="10"
                        value={post.content}
                        onChange={(evt) => handleChange(evt)}
                        required
                    />
                </div>

                <div className="creation-form__item">
                    <label htmlFor="image">Ajouter une image</label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        onChange={(evt) => handleChangeFile(evt)}
                    />
                </div>

                <button type="submit" id="btn-submit">
                    Publier
                </button>
            </form>
        </section>
    );
}
