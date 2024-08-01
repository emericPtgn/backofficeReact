import React, { useEffect } from "react";
import { useState } from "react";
import { getProgrammations } from "../../../service/api";

const ProgrammationTable = () => {
    const [programmations, setProgrammations] = useState([]);
    useEffect(()=>{
        const fetchProgrammations = async () => {
            try {
                const data = await getProgrammations();
                setProgrammations(data);
                console.log(data);
                return data;
            } catch (error) {
                console.error('error while fetching programmation:', error);
                throw error;
            }
        };
        fetchProgrammations();
    }, [])
    return (
        <>
            <div className="container-table">
                <table className="table-level2"> 
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">TITRE</th>
                            <th scope="col">DESCRIPTION</th>
                            <th scope="col">DATE DEBUT</th>
                            <th scope="col">DATE FIN</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {programmations.map((programmation, index)=>
                            <Programmation programmation={programmation} id={index+1}  key={index} />
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

const Programmation = ({ programmation, id }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {day : 'numeric', month: 'long'});
    }
    const formatedDateDebut = formatDate(programmation.dateDebut);
    const formatedDateFin = formatDate(programmation.dateFin);

    return (
        <>
        <tr>
            <td hidden dataset={programmation.id}></td>
            <td >{id}</td>
            <td scope="row">{programmation.titre}</td>
            <td scope="row">{programmation.description}</td>
            <td>{formatedDateDebut}</td>
            <td>{formatedDateFin}</td>
            <td>
                <button className="btn-primary" type="button"> <a href={`/programmation-edit/${programmation.id}`}>Modifier</a> </button>   
                <button type="button">Supprimer</button>               
            </td>
        </tr>
        </>
    )
}

export default ProgrammationTable

