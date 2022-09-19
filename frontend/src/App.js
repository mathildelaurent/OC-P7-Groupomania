import Footer from "./components/Footer";
import Header from "./components/Header";
import Connexion from "./pages/Connexion";

import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import { v4 as uuidv4 } from "uuid";
import PostAdd from "./pages/PostAdd";
import CardId from "./components/CardId";
import { useState } from "react";

function App() {
    //  const [users, setUsers] = useState({});
    //const [posts, setPosts] = useState();
    /*  const STORAGE_KEY_USERS = "users";
    const [storedUsers, setStoredUsers] = useLocalStorage(
        STORAGE_KEY_USERS,
        []
    );*/

    //console.log(posts);
    /*
    useEffect(() => {
        setUsers(storedUsers);
    }, []);

    useEffect(() => {
        setStoredUsers(users);
    }, [users]);
*/
    // function handleLogin(user) {
    //   setUsers({ ...user });
    // }

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Connexion />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                    path="/login"
                    element={<Login /*handleLogin={handleLogin}*/ />}
                />
                <Route path="/welcome" element={<Welcome />} />
                <Route
                    path="/postadd"
                    element={<PostAdd /*users={users} */ />}
                />
                <Route path="/CardId/:id" element={<CardId />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
