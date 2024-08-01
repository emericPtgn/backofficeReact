// ArtisteTable.js
import React, { useState, useEffect } from "react";
import { getArtistes } from "../../../service/api";

const ArtisteTable = () => {
    const [artistes, setArtistes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtistes = async () => {
            try {
                setIsLoading(true);
                const response = await getArtistes();
                if (Array.isArray(response)) {
                    setArtistes(response);
                } else {
                    console.warn('No artistes found or invalid response format');
                    setArtistes([]);
                }
            } catch (error) {
                console.error("Failed to fetch artistes", error);
                setError('Failed to fetch artistes');
            } finally {
                setIsLoading(false);
            }
        };

        fetchArtistes();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
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
                    {artistes.length === 0 ? (
                        <tr>
                            <td colSpan="4" style={{textAlign: 'center'}}>Aucun artiste trouvé</td>
                        </tr>
                    ) : (
                        artistes.map((artiste, index) => (
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