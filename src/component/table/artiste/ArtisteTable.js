// ArtisteTable.js
import React, { useState, useEffect } from "react";
import { getArtistes } from "../../../service/api";
import { Button } from "bootstrap";

const ArtisteTable = () => {
    const [artistes, setArtistes] = useState([]);

    useEffect(() => {
        const fetchArtistes = async () => {
            try {
                const data = await getArtistes(); // Assuming getArtistes is an async function
                setArtistes(data);
            } catch (error) {
                console.error("Failed to fetch artistes", error);
            }
        };

        fetchArtistes();
    }, []);

    return (
        <>
        <div className="container-table">
        <table className="artiste-table">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Genre</th>
                    {/* <th scope="col">Description</th> */}
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {artistes.map((artiste, i) => 
                    <ArtisteRow id={i + 1} key={i} artiste={artiste}/>
                )}
            </tbody>
        </table>
        </div>
        </>
    )
}

export default ArtisteTable;

const ArtisteRow = ({ artiste, id }) => {
    return (
        <>
            <tr>
                <td hidden dataset={artiste.id} ></td>
                <td>{id}</td>
                <td scope="row">{artiste.nom}</td>
                <td>{artiste.style}</td>
                {/* <td>{artiste.description}</td> */}
                <td> 
                    <button className="btn-primary" type="button"> <a href={`/artiste-edit/${artiste.id}`}>Modifier</a> </button> 
                    <button type="button">Supprimer</button> 
                </td>
            </tr>
        </>
    )
}
