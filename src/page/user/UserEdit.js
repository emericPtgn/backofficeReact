// composant page 
// composants enfants : header layout level 2, user Form, RightSideBar
// données : user 
// fonction : rendre les composants enfants 
// modification mot de passe => générer / envoyer mail réinitialisation mot de passe


// ***** IMPORTANT ***** UN UTILISATEUR PEUT CONSULTER UNIQUEMENT SA PROPRE FICHE UTILISATEUR - SAUF ADMIN QUI PEUT ACCEDER A TOUTE FICHE
// Plusieurs scénarios : 
// A ) Un utilisateur non admin consulte sa propre fiche
// B ) Un utilisateur admin consulte sa propre fiche
// C ) Un utilisateur admin consulte la fiche d'un autre utilisateur



import React, {useCallback, useEffect, useState} from "react";
import UserForm2 from "../../component/primereact/user/UserForm2";
import { useUserState } from "../../context/UserContext";
import Header from "../../component/layout/levelTwo/Header";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import { updateUser } from "../../service/api";
import { useParams } from "react-router-dom";


const UserEdit = () => {
    const {id} = useParams();
    const state = useUserState();
    const [user, setUser] = useState();
    const [isDatasFromAdminUser, setIsDatasFromAdminUser] = useState(false);

    const handleOnClick = useCallback(()=>{
        console.log(user);
        // const responseUpdateUser = updateUser(id, dispatch, user)
    }, [])

    useEffect(() => {
        // paramètre URL ID récupéré à partir de la rangée du tableau utilisateur puis placé en paramètre de l'url
        // un utilisateur non admin peut uniquement consulter sa propre fiche
        // le paramètre ID de l'url correspond à l'ID de l'utilisateur récupéré àp artir du tableau utilisateurs
        // l'ID en paramètre correspond à l'ID de l'utilisateur dont on chargé les données à l'écran
        let isUser = state.users.find(user => user.id == id);
        setUser(isUser);
        // si l'ID de l'utilisateur chargé dans le formulaire ne correspond pas à l'ID de l'utilisateur actif alors scénario est le scénario C 
        // A ) Un utilisateur non admin consulte sa propre fiche
        // B ) Un utilisateur admin consulte sa propre fiche
        // C ) Un utilisateur admin consulte la fiche d'un autre utilisateur


        // l'utilisateur est admin ? consulte t il sa propre fiche ? si oui les données sont les données sont 
        if(state?.activUser?.id == id){
            if(state.isAdmin){
                setIsDatasFromAdminUser(true);
            } else {
                setIsDatasFromAdminUser(false);
            }
        }
    }, [state])

    return (
        <div className="container-level2">
            <Header />
            <div className="content-wrapper">
                <div id="mainContent">
                    <h2>Contenu principal</h2>
                    {user && (
                        <>
                            <UserForm2 id={id} user={user} setUser={setUser} isActivUserAdmin={state?.isAdmin} isDatasFromAdminUser={isDatasFromAdminUser}/>
                        </>
                    )}
                </div>
                <RightSidebar handleOnClick={handleOnClick} />
            </div>
        </div>
    );
}

export default UserEdit;