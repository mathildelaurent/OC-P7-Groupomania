import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import nl2br from "react-nl2br";

export default function PostsCard(props) {
    const { post } = props;

    const [toggleLike, setToggleLike] = useState(false);
    const [toggleDislike, setToggleDislike] = useState(false);
    const [toggleContent, setToggleContent] = useState(false);

    const { storedUsers } = useContext(AuthContext);

    const date = new Date(post.date);

    if (
        (post.imageUrl && post.userId === storedUsers.userId) ||
        storedUsers.isAdmin === 1
    ) {
    } else if (
        (post.imageUrl && !post.userId === storedUsers.userId) ||
        !storedUsers.isAdmin === 1
    ) {
    } else if (
        (!post.imageUrl && post.userId === storedUsers.userId) ||
        storedUsers.isAdmin === 1
    ) {
    } else if (
        (!post.imageUrl && !post.userId === storedUsers.userId) ||
        !storedUsers.isAdmin === 1
    ) {
    }

    function handleModify() {
        window.location.href = `./ModifyPost/${post._id}`;
    }

    function handleDelete() {
        fetch(`http://localhost:3000/api/posts/${post._id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${storedUsers.token}`,
            },
            body: JSON.stringify({
                title: post.title,
                content: post.content,
                imageUrl: post.imageUrl,
            }),
        }).then((response) => {
            if (response.ok === true) {
                window.location.href = "../welcome";
            }
        });
    }

    function handleOpinionLike() {
        if (
            !post.usersLiked.includes(storedUsers.userId) &&
            post.usersDisliked.includes(storedUsers.userId)
        ) {
            // document.getElementById("error-like").style.display = "block";
        }

        if (
            !post.usersLiked.includes(storedUsers.userId) &&
            !post.usersDisliked.includes(storedUsers.userId)
        ) {
            fetch(`http://localhost:3000/api/posts/${post._id}/like`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${storedUsers.token}`,
                },
                body: JSON.stringify({ like: 1 }),
            }).then(() => {
                setToggleLike(!toggleLike);
                post.usersLiked.push(storedUsers.userId);
            });
        }

        if (
            post.usersLiked.includes(storedUsers.userId) &&
            !post.usersDisliked.includes(storedUsers.userId)
        ) {
            fetch(`http://localhost:3000/api/posts/${post._id}/like`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${storedUsers.token}`,
                },
                body: JSON.stringify({ like: 0 }),
            }).then((response) => {
                // document.getElementById("error-dislike").style.display = "none";
                setToggleLike(!toggleLike);
                post.usersLiked = post.usersLiked.filter(
                    (user) => user !== storedUsers.userId
                );
            });
        }
    }

    function handleOpinionDislike() {
        if (
            !post.usersDisliked.includes(storedUsers.userId) &&
            post.usersLiked.includes(storedUsers.userId)
        ) {
            //  document.getElementById("error-dislike").style.display = "block";
        }

        if (
            !post.usersDisliked.includes(storedUsers.userId) &&
            !post.usersLiked.includes(storedUsers.userId)
        ) {
            fetch(`http://localhost:3000/api/posts/${post._id}/like`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${storedUsers.token}`,
                },
                body: JSON.stringify({ like: -1 }),
            }).then((response) => {
                setToggleDislike(!toggleDislike);
                post.usersDisliked.push(storedUsers.userId);
            });
        }

        if (
            post.usersDisliked.includes(storedUsers.userId) &&
            !post.usersLiked.includes(storedUsers.userId)
        ) {
            fetch(`http://localhost:3000/api/posts/${post._id}/like`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${storedUsers.token}`,
                },
                body: JSON.stringify({ like: 0 }),
            }).then((response) => {
                //  document.getElementById("error-like").style.display = "none";
                setToggleDislike(!toggleDislike);
                post.usersDisliked = post.usersDisliked.filter(
                    (user) => user !== storedUsers.userId
                );
            });
        }
    }

    function handleContent(evt) {
        if (toggleContent === true) {
            evt.target.id = "content";
        } else if (toggleContent === false) {
            evt.target.id = "content-click";
        }
        setToggleContent(!toggleContent);
    }

    return (
        <div key={post._id} id="card">
            <div id="card-container">
                <p id="user-post">De: {post.from}</p>
                <p id="creation-date">Date: {date.toLocaleString()}</p>
                <h2 id="title">{post.title}</h2>
                <p id="content" onClick={(evt) => handleContent(evt)}>
                    {nl2br(post.content)}
                </p>
                <div id="image-btn">
                    <a
                        href={post.imageUrl}
                        target="_blank"
                        id={post.imageUrl ? "image" : "image-unvisible"}
                    >
                        <img
                            src={post.imageUrl}
                            alt=""
                            title="Cliquez pour agrandir"
                        />
                    </a>
                    <div
                        id={
                            post.userId === storedUsers.userId ||
                            storedUsers.isAdmin === 1
                                ? "btn"
                                : "unvisible"
                        }
                    >
                        <div id="boutons">
                            <button
                                id="modify-post"
                                onClick={() => handleModify()}
                            >
                                Modifier
                            </button>
                            <button
                                id="delete-post"
                                onClick={() => handleDelete()}
                            >
                                Supprimer
                            </button>
                        </div>
                        <div id="boutons-mobile">
                            <i
                                className="fa-solid fa-pen-to-square"
                                onClick={() => handleModify()}
                            ></i>
                            <i
                                className="fa-solid fa-trash"
                                onClick={() => handleDelete()}
                            ></i>
                        </div>
                    </div>
                </div>
            </div>

            <div id="opinion">
                <i
                    className={`fa-regular fa-thumbs-up ${
                        post.usersLiked.includes(storedUsers.userId)
                            ? "switch-like"
                            : ""
                    }`}
                    onClick={() => handleOpinionLike()}
                ></i>
                <i
                    className={`fa-regular fa-thumbs-down ${
                        post.usersDisliked.includes(storedUsers.userId)
                            ? "switch-dislike"
                            : ""
                    }`}
                    onClick={() => handleOpinionDislike()}
                ></i>
            </div>
        </div>
    );
}
