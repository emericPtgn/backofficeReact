import React from "react";
import { useMemo } from "react";

export const ProgrammationRow = ({ programmation, id }) => {
    const formatDate = useMemo(() => (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {day : 'numeric', month: 'long'});
    }, []);

    const formatedDateDebut = formatDate(programmation.dateDebut);
    const formatedDateFin = formatDate(programmation.dateFin);

    return (
        <tr>
            <td>{id}</td>
            <td>{programmation.titre}</td>
            <td>{programmation.description}</td>
            <td>{formatedDateDebut}</td>
            <td>{formatedDateFin}</td>
            <td>
                <a href={`/programmation-edit/${programmation.id}`} className="btn-primary">Modifier</a>
                <button type="button" onClick={() => {/* Logique de suppression */}}>Supprimer</button>
            </td>
        </tr>
    );
};