import React, { useEffect, useState } from "react";
import { getActivities } from "../../../service/api";
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

    return (
        <div className="container-table">
            <table className="table-level2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
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
                            <Activity key={activity.id || index} id={index + 1} activity={activity} />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};


const Activity = ({activity, id}) => {
    return (
        <>
        <tr>
            <td hidden dataset={activity.id}></td>
            <td>{id}</td>
            <td scope="row">{activity.type}</td>
            <td>{activity.artiste?.nom}</td>
            <td>{activity.date}</td>
            <td>
                <button className="btn-primary" type="button"> <a href={`/activity-edit/${activity.id}`}>Modifier</a> </button>   
                <button type="button">Supprimer</button>               
            </td>
            
        </tr>
        </>
    )
}

export default ActivityTable