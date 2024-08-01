import React, { useEffect } from "react";
import { useState } from "react";
import { getCommerces } from "../../../service/api";

const CommerceTable = () => {
    const [commerces, setCommerces] = useState([]);
    useEffect(()=>{
        const fetchCommerce = async () => {
            try {
                const data = await getCommerces();
                setCommerces(data);
                console.log(data);
                return data;
            } catch (error) {
                console.error('error while fetching commerces:', error);
                throw error;
            }
        };
        fetchCommerce();
    }, [])
    return (
        <>
            <div className="container-table">
                <table className="table-level2"> 
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NOM</th>
                            <th scope="col">TYPE</th>
                            <th scope="col">PRODUIT</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commerces.map((commerce, index)=>
                            <Commerce commerce={commerce} id={index+1}  key={index} />
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

const Commerce = ({commerce, id}) => {
    return (
        <>
        <tr>
            <td hidden dataset={commerce.id}></td>
            <td >{id}</td>
            <td scope="row">{commerce.nom}</td>
            <td>{commerce.typeCommerce.nom}</td>
            <td>{commerce.typeProduit.nom ? commerce.typeProduit.nom : ''}</td>
            <td>
                <button className="btn-primary" type="button"> <a href={`/activity-edit/${commerce.id}`}>Modifier</a> </button>   
                <button type="button">Supprimer</button>               
            </td>
        </tr>
        </>
    )
}

export default CommerceTable