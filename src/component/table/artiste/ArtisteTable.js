// ArtisteTable.js
import React, { useState, useEffect } from "react";
import { getArtistes } from "../../../service/api";
import { useArtistesDispatch, useArtistesState } from "../../../context/ArtisteContext";

const ArtisteTable = () => {
    const state = useArtistesState();
    const dispatch = useArtistesDispatch();
    const [isLoading, setIsLoading] = useState(true);


    if (state.error) {
        return <div>Error: {state.error}</div>;
    }

    if (!state.artistes || state.artistes.length === 0) {
        return <div>No artistes available.</div>;
    }

    return (
        <div className="container-table">
            <table className="table-level2">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {state.artistes.length === 0 ? (
                        <tr>
                            <td colSpan="4" style={{textAlign: 'center'}}>Aucun artiste trouvé</td>
                        </tr>
                    ) : (
                        state.artistes.map((artiste, index) => (
                            <ArtisteRow key={artiste.id || index} id={index + 1} artiste={artiste} />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

const ArtisteRow = ({ artiste, id }) => {
    return (
        <tr>
            <td hidden data-id={artiste.id}></td>
            <td>{id}</td>
            <td scope="row">{artiste.nom}</td>
            <td>{artiste.style}</td>
            <td> 
                <button className="btn-primary" type="button">
                    <a href={`/artiste-edit/${artiste.id}`}>Modifier</a>
                </button> 
                <button type="button">Supprimer</button> 
            </td>
        </tr>
    );
};

export default ArtisteTable;