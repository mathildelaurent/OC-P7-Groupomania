import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

export default function PostsCard(props) {
    const { post } = props;
    const { storedUsers } = useContext(AuthContext);

    function handleClick() {
        window.location.href = `./CardId/${post._id}`;
    }

    /* function handleModify() {
        console.log(post);
        fetch(`http://localhost:3000/api/posts/${post._id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${storedUsers.token}`,
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((datas) => {
                console.log(datas);
            });
    }*/

    return (
        <div id="card" onClick={() => handleClick()}>
            <h2 id="title">{post.title}</h2>
            <p id="content">{post.content}</p>
            <div id="image">
                <img src={post.imageUrl} alt="" />
            </div>

            <div id="btn">
                <button id="modify-post" /*onClick={() => handleModify()}*/>
                    Modifier
                </button>
                <button id="delete-post">Supprimer</button>
            </div>
        </div>
    );
}
