import React from "react";
import Header from '../../component/layout/levelTwo/Header.js'
import UserTable from "../../component/table/user/UserTable";

const User = () => {
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

export default User;