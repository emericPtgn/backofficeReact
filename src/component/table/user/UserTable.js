import React, { useEffect } from "react";
import { useState } from "react";
import { getUsers } from "../../../service/api";

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(()=>{
        const fetchUsers = async () => {
            try {
                const usersDatas = await getUsers();
                console.log(usersDatas);
                if(!Array.isArray(usersDatas)){
                    setUsers([usersDatas]);
                } else {
                    setUsers(usersDatas)
                }
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setError(error.message || 'oups something went wrong while fetching users datas : ');
                console.error('oups something went wrong while fetching users datas : ', error)
            }
 
        }
        fetchUsers();
    }, [])

    if(isLoading){
        return <div>Chargement en cours...</div>
    }
    if(error){
        return <div>Oups something wrong happened : {error}</div>
    }
    return (
        <>
        <div className="container-table">
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
                        <td colSpan={5} style={{textAlign: 'center'}}>No users found</td>
                    </tr>
                ) : 
                (
                    users.map((user, index) => (
                        <User key={index} index={index} id={user.id} user={user}/>
                    ))
                )
                }
            </tbody>
        </table>
        </div>
        </>
    )
}

const User = ({user, index}) => {
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

export default UserTable;