import { useParams } from "react-router";
import { useContext, useState, useCallback, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

export default function ModifyPost() {
    const { id } = useParams();
    const { storedUsers } = useContext(AuthContext);
    const [newFile, setNewFile] = useState();
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [imageUrl, setImageUrl] = useState();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", newFile);

    const fetchHandler = useCallback(async () => {
        try {
            const response = await fetch(
                "http://localhost:3000/api/posts/" + id,
                {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${storedUsers.token}`,
                    },
                }
            );
            const dataResponse = await response.json();

            if (response.ok) {
                setTitle(dataResponse.title);
                setContent(dataResponse.content);
                setImageUrl(dataResponse.imageUrl);
            } else {
                throw new Error(dataResponse.error);
            }
        } catch (error) {
            console.log("Problème serveur la requête n'est pas partie");
            console.log(error);
        }
    }, [storedUsers.token]);

    useEffect(() => {
        fetchHandler();
    }, [fetchHandler]);

    function handleChangeTitle(evt) {
        setTitle(evt.target.value);
    }

    function handleChangeContent(evt) {
        setContent(evt.target.value);
    }

    function handleChangeFile(evt) {
        if (evt.target.files[0]) {
            setNewFile(evt.target.files[0]);
            document
                .getElementById("firstImage")
                .parentNode.removeChild(document.getElementById("firstImage"));
        }
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        const url = "http://localhost:3000/api/posts/" + id;
        fetch(url, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${storedUsers.token}`,
            },
            body: formData,
        })
            .then((response) => {
                return response.json();
            })
            .then((datas) => {
                window.location.href = "http://localhost:3001/welcome";
            });
    }

    return (
        <div id="modify-post">
            <p className="btn-menu">
                <NavLink
                    to="/welcome"
                    className={({ isActive }) =>
                        isActive ? "activeLink" : "undefined"
                    }
                >
                    Retour à l'accueil
                </NavLink>
            </p>
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
                        value={title}
                        onChange={(evt) => handleChangeTitle(evt)}
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
                        value={content}
                        onChange={(evt) => handleChangeContent(evt)}
                        required
                    />
                </div>
                <div id="firstImage">
                    <img src={imageUrl} id="image" name="image" alt=""></img>
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
        </div>
    );
}
