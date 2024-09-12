import React, { useEffect, useRef } from "react";
import EmailSection from "../../component/primereact/user/EmailSection";
import RolesSection from "../../component/primereact/user/RolesSection";
import { useState } from "react";
import Header from "../../component/layout/levelTwo/Header";
import { Toast } from "primereact/toast";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import { addUser } from "../../service/api";


const UserNew = () => {
    return (
        <>
        <NewUserForm />
        </>
    )
};

export default UserNew;

const NewUserForm = () => {
    const [user, setUser] = useState({
        email : '',
        newMail : '',
    });
    const toast = useRef(null);
    const show = () => toast.current.show({severity : 'info', summary: 'info', detail : 'Nouvel utilisateur ajouté ✅'})
    const handleOnClick = async () => {
        console.log(user)
        const data = await addUser(user);
        console.log(data);
    }
    useEffect(()=>{
        console.log(user)
    }, [user])

    return (
        <div className="container-level2">
            <Header />
            <div className="content-wrapper">
                <div id="mainContent">
                    <h2>Contenu principal</h2>
                    <Toast ref={toast} />
                    {user && (
                        <>
                            <EmailSection user={user} setUser={setUser}/>
                            <RolesSection user={user} setUser={setUser} />
                        </>                    
                    )}
                </div>
                <RightSidebar handleOnClick={handleOnClick} />
            </div>
        </div>
    );
}