import React, { useEffect, useState } from "react";
import { useCommercesState, useCommercesDispatch } from "../../../context/CommerceContext";
import { getCommerces } from "../../../service/api";

export default function CommerceTable() {
    const state = useCommercesState();
    const dispatch = useCommercesDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await getCommerces(dispatch);
            setIsLoading(false);
        };
        fetchData();
    }, [dispatch]);

    console.log('CommerceTable state:', state);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (state.error) {
        return <div>Error: {state.error}</div>;
    }

    if (!state.commerces || state.commerces.length === 0) {
        return <div>No commerces available.</div>;
    }

    return (
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
                    {state.commerces.map((commerce, index) => (
                        <Commerce commerce={commerce} id={index + 1} key={index} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const Commerce = ({ commerce, id }) => {
    return (
        <tr>
            <td>{id}</td>
            <td>{commerce.nom}</td>
            <td>{commerce.typeCommerce.nom}</td>
            <td>{commerce.typeProduit?.nom || ''}</td>
            <td>
                <button className="btn-primary" type="button">
                    <a href={`/commerce-edit/${commerce.id}`}>Modifier</a>
                </button>
                <button type="button">Supprimer</button>
            </td>
        </tr>
    );
};
