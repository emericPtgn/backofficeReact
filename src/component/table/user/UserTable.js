import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { useUserState } from "../../../context/UserContext";
import { UserRow } from "./UserRow";

const ERROR_MESSAGE = "Une erreur est survenue lors du chargement des utilisateurs.";
const CREATE_FIRST_MESSAGE = "Créez votre premier utilisateur.";
const LOADING_MESSAGE = 'Chargement en cours';
const NO_USERS_MESSAGE = "Aucun utilisateur trouvé";

const UserTable = () => {
    const { users, fetchError } = useUserState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (users !== undefined || fetchError) {
            setIsLoading(false);
        }
    }, [users, fetchError]);

    const tableContent = useMemo(() => {
        if (isLoading) return <div>{LOADING_MESSAGE}</div>;
        if (fetchError) return <div>{ERROR_MESSAGE}</div>;
        if (users?.length === 0) return <div>{CREATE_FIRST_MESSAGE}</div>;

        return (
            <table className="table-level2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">EMAIL</th>
                        <th scope="col">ROLES</th>
                        <th scope="col">LAST MODIF</th>
                        <th scope="col">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan={5} style={{textAlign: 'center'}}>{NO_USERS_MESSAGE}</td>
                        </tr>
                    ) : (
                        users.map((user, index) => (
                            <UserRow key={user.id} index={index} id={user.id} user={user}/>
                        ))
                    )}
                </tbody>
            </table>
        );
    }, [users, isLoading, fetchError]);

    return (
        <div className="container-table">
            {tableContent}
        </div>
    );
};

export default UserTable;