import React, { useEffect, useState } from "react";
import { getActivities } from "../../../service/api";

const ActivityTable = () => {
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                setIsLoading(true);
                const response = await getActivities();
                if (Array.isArray(response)) {
                    setActivities(response);
                } else {
                    console.warn('No activities found or invalid response format');
                    setActivities([]);
                }
            } catch (error) {
                console.error('Failed to fetch activities:', error);
                setError('Failed to fetch activities');
            } finally {
                setIsLoading(false);
            }
        };

        fetchActivities();
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
                        <th scope="col">ID</th>
                        <th scope="col">TYPE</th>
                        <th scope="col">ARTISTE</th>
                        <th scope="col">DATE</th>
                        <th scope="col">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {activities.length === 0 ? (
                        <tr>
                            <td colSpan="5" style={{textAlign: 'center'}}>Aucune activité trouvée</td>
                        </tr>
                    ) : (
                        activities.map((activity, index) => (
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