import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { useProgrammationState } from "../../../context/ProgrammationContext";
import { ProgrammationRow } from "./ProgrammationRow";

const ERROR_MESSAGE = "Une erreur est survenue lors du chargement des programmations.";
const NO_DATA_MESSAGE = "Aucune programmation trouvée.";
const CREATE_FIRST_MESSAGE = "Créez votre première programmation.";

const ProgrammationTable = () => {
    const { programmations, fetchError } = useProgrammationState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (programmations || fetchError) {
            setIsLoading(false);
        }
    }, [programmations, fetchError]);

    if (isLoading) return <div>Chargement...</div>;
    if (fetchError) return <div>{ERROR_MESSAGE}</div>;
    if (!programmations || programmations.length === 0) return <div>{NO_DATA_MESSAGE}</div>;

    return (
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
                    {programmations.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{textAlign: 'center'}}>{CREATE_FIRST_MESSAGE}</td>
                        </tr>
                    ) : (
                        programmations.map((programmation, index) => (
                            <ProgrammationRow programmation={programmation} id={index+1} key={programmation.id} />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};


export default ProgrammationTable;