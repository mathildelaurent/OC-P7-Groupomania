import Footer from "./components/Footer";
import Header from "./components/Header";
import Connexion from "./pages/Connexion";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import PostAdd from "./pages/PostAdd";
import ModifyPost from "./components/ModifyPost";
import MentionsLegales from "./pages/MentionsLegales";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Connexion />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/postadd" element={<PostAdd />} />
                <Route path="/ModifyPost/:id" element={<ModifyPost />} />
                <Route path="/mentionslegales" element={<MentionsLegales />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
