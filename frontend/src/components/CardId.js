import { useParams } from "react-router";
import { useContext, useState, useCallback, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function CardID() {
    const { id } = useParams();
    const { storedUsers } = useContext(AuthContext);
    console.log(id);
    const [data, setData] = useState([]);
    console.log(data);
    /*  const url = "http://localhost:3000/api/posts" + id;
    console.log(url);*/

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
        /*  .then(() => {
                window.location.href = "../welcome";
            });*/
    }

    function handleModify() {
        fetch(`http://localhost:3000/api/posts/${data._id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${storedUsers.token}`,
            },
        }).then((response) => {
            return response.json();
        });
        /*   .then(() => {
                window.location.href = "./welcome";
            });*/
    }

    return (
        <>
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
        </>
    );
}
