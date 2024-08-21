import React, { useEffect } from "react";
import Header from '../../component/layout/levelTwo/Header.js'
import UserTable2 from "../../component/primereact/user/UserTable2.js";
import { useUserState } from "../../context/UserContext.js";
import { useMemo, useState } from "react";
import useUserHooks from "./hooks/useUserHooks.js";

const User = () => {
    const state = useUserState();
    const isAdmin = state.isAdmin;
    const allUsers = state.users;
    const [isLoading, setIsLoading] = useState(true);
    let users = [];
    users = isAdmin ? allUsers : [state.activUser];

    useEffect(() => {
        if (users !== undefined && users !== null && users.length !== 0) {
            setIsLoading(false);
            console.log(users)
        }
    }, [isAdmin]);

    return (
        <>
            <div className="container-level2">
                <Header />
                <div className="container-main-content-level2">
                    {!isLoading && <UserTable2 users={users} />}
                </div>
            </div>
        </>
    )
}

export default User;
