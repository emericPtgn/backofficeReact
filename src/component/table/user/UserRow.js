import React from "react";

export const UserRow = ({user, index}) => {
    return (
        <>
        <tr dataset={user.id}>
            <td>{index + 1}</td>
            <td>{user.email}</td>
            <td>{user.roles}</td>
            <td>{user.dateModification}</td>
            <td>
                <button className="btn-primary" type="button"> <a href={`/user-edit/${user.id}`}>Modifier</a> </button>   
                <button type="button">Supprimer</button>   
            </td>
        </tr>
        </>
    )
}