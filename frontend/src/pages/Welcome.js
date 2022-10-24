import { useCallback, useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";
import PostCard from "../components/PostCard";

export default function Welcome() {
    const { storedUsers } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const { userLogged } = useContext(AuthContext);
    const STORAGE_KEY_POSTS = "posts";
    const [storedPosts, setStoredPosts] = useLocalStorage(
        STORAGE_KEY_POSTS,
        []
    );

    if (!storedUsers.token) {
        window.location.href = "/";
    }

    const fetchHandler = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:3000/api/posts", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${storedUsers.token}`,
                },
            });
            const dataResponse = await response.json();

            if (response.ok) {
                setStoredPosts(dataResponse.reverse());
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

    function handleLogOut() {
        userLogged({
            firstname: "",
            token: "",
            userId: "",
            lastname: "",
            job: "",
            isAdmin: "",
        });
    }

    function handleAddPost() {
        window.location.href = "/postadd";
    }

    return (
        <section id="welcome">
            <h2>Toutes les publications</h2>
            <h4>Bienvenue {storedUsers.firstname}</h4>

            <div id="menu">
                <a className="btn-menu" onClick={() => handleAddPost()}>
                    Créer une publication
                </a>

                <a className="btn-menu" onClick={() => handleLogOut()}>
                    Se déconnecter
                </a>
            </div>
            <div id="menu-mobile">
                <i class="fa-solid fa-plus" onClick={() => handleAddPost()}></i>

                <i
                    class="fa-solid fa-right-from-bracket"
                    onClick={() => handleLogOut()}
                ></i>
            </div>

            <div id="posts">
                {storedPosts.map((post) => (
                    <PostCard post={post} />
                ))}
            </div>
        </section>
    ); // fin du return
} // fin function Welcome
