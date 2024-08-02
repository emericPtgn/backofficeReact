import React, { useEffect } from "react";
import Header from '../../component/layout/levelTwo/Header.js'
import UserTable from "../../component/table/user/UserTable";
import {  UserProvider, useUserDispatch } from "../../context/UserContext.js";
import { getUsers } from "../../service/api.js";

export default function UserComponent(){
    return (
        <UserProvider>
            <User></User>
        </UserProvider>
    )
}
const User = () => {
    const dispatch = useUserDispatch();
    useEffect(()=>{
        getUsers(dispatch)
    }, [dispatch])
    return (
        <>
            <div className="container-level2">
                <Header />
                <div className="container-main-content-level2">
                    <UserTable />
                </div>
            </div>
        </>
    )
}

