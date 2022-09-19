import React, { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [user, setUser] = useState({});
    console.log(user);

    const STORAGE_KEY_USERS = "users";
    const [storedUsers, setStoredUsers] = useLocalStorage(
        STORAGE_KEY_USERS,
        []
    );
    const userLogged = (datas) => {
        setStoredUsers({ ...storedUsers, ...datas });
    };

    return (
        <AuthContext.Provider value={{ userLogged, user, storedUsers }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
