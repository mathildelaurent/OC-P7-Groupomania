import { useParams } from "react-router";
import { useContext, useState, useCallback, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

export default function CardID() {
    const { id } = useParams();
    const { storedUsers } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const userPost = data.userId;
    console.log(userPost);
    console.log(data);

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

    function handleDelete() {
        fetch(`http://localhost:3000/api/posts/${data._id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${storedUsers.token}`,
            },
            body: JSON.stringify({
                title: data.title,
                content: data.content,
                imageUrl: data.imageUrl,
            }),
        }).then((response) => {
            if (response.ok === true) {
                window.location.href = "../welcome";
            }
        });
    }

    function handleModify() {
        window.location.href = `./ModifyPost/${data._id}`;
    }

    function handleOpinionLike(evt) {
        const like = evt.target;
        like.classList.toggle("switch-like");

        fetch(`http://localhost:3000/api/posts/${data._id}/like`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${storedUsers.token}`,
            },
            body: JSON.stringify({ like: 1 }),
        }).then((response) => {
            console.log(response);
        });
    }

    function handleOpinionDislike(evt) {
        const dislike = evt.target;
        dislike.classList.toggle("switch-dislike");
    }

    return (
        <section id="userPost">
            <p className="btn-menu">
                <NavLink
                    to="/welcome"
                    className={({ isActive }) =>
                        isActive ? "activeLink" : undefined
                    }
                >
                    Retour à l'accueil
                </NavLink>
            </p>
            <h2 id="title">{data.title}</h2>
            <p id="content">{data.content}</p>
            <div id="image">
                <img src={data.imageUrl} alt="" />
            </div>
            <div id="btn">
                <button id="modify-post" onClick={() => handleModify()}>
                    Modifier
                </button>
                <button id="delete-post" onClick={() => handleDelete()}>
                    Supprimer
                </button>
            </div>
            <div id="opinion">
                <i
                    className="fa-regular fa-thumbs-up"
                    onClick={(evt) => handleOpinionLike(evt)}
                ></i>
                <i
                    className="fa-regular fa-thumbs-down"
                    onClick={(evt) => handleOpinionDislike(evt)}
                ></i>
            </div>
        </section>
    );
}
