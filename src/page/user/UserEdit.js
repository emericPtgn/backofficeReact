import React, { useCallback, useEffect, useRef, useState } from "react";
import UserForm2 from "../../component/primereact/user/UserForm2";
import { useUserDispatch, useUserState } from "../../context/UserContext";
import Header from "../../component/layout/levelTwo/Header";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import { emailConfirmEmailUpdate, updateUser } from "../../service/api";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useAuth } from "../../context/Context";
import HandleLogout from "../../context/AuthContext";

const UserEdit = () => {
    const { id } = useParams();
    const state = useUserState();
    const dispatch = useUserDispatch();
    const toast = useRef(null);
    const navigate = useNavigate();
    const {setIsAuthenticated, setToken} = useAuth();
    const [user, setUser] = useState({
        email: '',
        roles: '',
        checkPassword: '',
        newPassword: '',
        newMail: '',
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            // Ensure the dispatch is processed and state is updated
            if (state?.activUser?.id === id) {
                dispatch({ type: 'setIsDataActivUserData', payload: true });
            } else {
                dispatch({ type: 'setIsDataActivUserData', payload: false });
            }

            // Ensure that state update has been processed
            await new Promise(resolve => setTimeout(resolve, 0)); // Allow state to update

            const isUser = state.users.find(user => user?.id === id);
            if (isUser) {
                setUser({
                    email: isUser?.email,
                    roles: isUser?.roles[0],
                    checkPassword: '',
                    newPassword: '',
                    newMail: '',
                    dateModification : isUser?.dateModification,
                    verified : isUser?.verified
                });
            }

            setIsLoading(false); // Set loading to false after fetching data
        };

        fetchData();
    }, [id, state.users, state.activUser, dispatch]);

    const show = () => {
        toast.current.show({
            severity: 'info',
            summary: 'Info',
            detail: 'Mise à jour réussie ✅',
        });
    };

    const handleOnClick = useCallback(async () => {
        if (user.newMail) {
            const responseUpdateEmail = await emailConfirmEmailUpdate(id, user.newMail, dispatch);
            const responseUpdateUser = await updateUser(id, dispatch, user);
            show();
            console.log(responseUpdateEmail, responseUpdateUser);
        } else {
            const responseUpdateUser = await updateUser(id, dispatch, user);
            if(responseUpdateUser.status === 'success'){
                console.log(responseUpdateUser.status)
                show();
                await HandleLogout(setIsAuthenticated, setToken);
                navigate('/login');
            } else if (responseUpdateUser.status == 'invalid password'){
                console.log(responseUpdateUser.status)
            }

            console.log(responseUpdateUser);
        }
    }, [user, id, dispatch]);

    if (isLoading) {
        return <div>Loading...</div>; // Display a loading indicator until data is loaded
    }

    return (
        <div className="container-level2">
            <Header />
            <div className="content-wrapper">
                <div id="mainContent">
                    <Toast ref={toast} />
                    {user && (
                        <UserForm2
                            user={user}
                            setUser={setUser}
                        />
                    )}
                </div>
                <RightSidebar item={user} handleOnClick={handleOnClick} />
            </div>
        </div>
    );
};

export default UserEdit;
