import React, { useEffect, useState } from "react";
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { deleteActivity } from "../../../service/api";


import {useActiviteState, useActiviteDispatch} from '../../../context/ActiviteContext'

const ActivityTable = () => {
    const state = useActiviteState();
    const dispatch = useActiviteDispatch();

    if (state.fetchError) {
        return <div>Error: {state.fetchError}</div>;
    }
    if (!state.activities || state.activities.length === 0) {
        return <div>No artistes available.</div>;
    }

    const handleOnClick = (id, dispatch) => {
        deleteActivity(id, dispatch);
    }
    


    return (
        <div className="container-table">
            <table className="table-level2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">NOM</th>
                        <th scope="col">TYPE</th>
                        <th scope="col">ARTISTE</th>
                        <th scope="col">DATE</th>
                        <th scope="col">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {state.activities.length === 0 ? (
                        <tr>
                            <td colSpan="5" style={{textAlign: 'center'}}>Aucune activité trouvée</td>
                        </tr>
                    ) : (
                        state.activities.map((activity, index) => (
                            <Activity key={activity.id || index} id={index + 1} activity={activity} handleOnClick={handleOnClick} />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};


const Activity = ({activity, id, handleOnClick}) => {
    // Fonction pour formater la date
    const formatDate = (dateString) => {
        if (!dateString) return 'Date non définie';
        const date = parseISO(dateString);
        return format(date, "d MMMM yyyy 'à' HH:mm", { locale: fr });
    }

    return (
        <tr>
            <td hidden data-id={activity.id}></td>
            <td>{id}</td>
            <td scope="row">{activity.nom}</td>
            <td scope="row">{activity.type}</td>
            <td>{activity.artiste?.nom}</td>
            <td>{formatDate(activity.date)}</td>
            <td>
                <button className="btn-primary" type="button">
                    <a href={`/activite-edit/${activity.id}`}>Modifier</a>
                </button>   
                <button type="button" onClick={() => handleOnClick(activity.id)}>Supprimer</button>         
            </td>
        </tr>
    )
}


export default ActivityTable