import { useCallback, useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PostCard from "../components/PostCard";

export default function Welcome() {
    const { storedUsers } = useContext(AuthContext);
    const [data, setData] = useState([]);
    console.log(data);

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

    return (
        <section id="welcome">
            <h2>Toutes les publications</h2>
            <h4>Bienvenue {storedUsers.firstname}</h4>

            <div id="menu">
                <p className="btn-menu">
                    <NavLink
                        to="/postadd"
                        className={({ isActive }) =>
                            isActive ? "activeLink" : "undefined"
                        }
                    >
                        Créer une publication
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

            <div id="posts">
                {data.map((post) => (
                    <PostCard post={post} />
                ))}
            </div>
        </section>
    ); // fin du return
} // fin function Welcome
