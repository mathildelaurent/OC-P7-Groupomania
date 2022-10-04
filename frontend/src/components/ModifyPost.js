import { useParams } from "react-router";
import { useContext, useState, useCallback, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function ModifyPost() {
    const { id } = useParams();
    const { storedUsers } = useContext(AuthContext);
    const [data, setData] = useState([]);
    console.log(data);
    const [newPost, setNewPost] = useState({
        title: data.title,
        content: data.content,
    });
    const [newFile, setNewFile] = useState();
    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    const formData = new FormData();
    formData.append("title", newPost.title);
    formData.append("content", newPost.content);
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
                setData(dataResponse);
                setTitle(dataResponse.title);
                setContent(dataResponse.content);
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
        console.log(evt.target.value);
        setTitle(evt.target.value);
        const { name, value } = evt.target;
        setNewPost({ ...newPost, [name]: value });
    }

    function handleChangeContent(evt) {
        console.log(evt.target);
        setContent(evt.target.value);
        const { name, value } = evt.target;
        setNewPost({ ...newPost, [name]: value });
    }

    function handleChangeFile(evt) {
        console.log(evt);
        console.log(evt.target.files[0]);
        if (evt.target && evt.target.files[0]) {
            setNewFile(evt.target.files[0]);
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
                console.log(datas);
                window.location.href = "http://localhost:3001/welcome";
            });
    }

    return (
        <>
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
        </>
    );
}
