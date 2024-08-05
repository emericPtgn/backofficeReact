import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateActivity } from "../../service/api";
import Header from "../../component/layout/levelTwo/Header";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import '../../App.css'
import ActiviteForm from "../../component/form/activite/ActiviteForm";
import { useActiviteState } from "../../context/ActiviteContext";

const ActivityEdit = () => {
    const { id } = useParams();
    const state = useActiviteState();
    const [activity, setActivity] = useState(null);

    useEffect(() => {
        const isActivity = state.activities.find(activite => activite.id === id);
        if (isActivity) {
            setActivity(isActivity);
            console.log(activity?.formattedDate)
        }

    }, [id, state.activities]);

    const handleOnClick = async () => {
        try {
            console.log(id, activity)
            const response = await updateActivity(id, activity);
            if (response.ok) {
                console.log('update success : activité mise à jour', response);
            }
        } catch (error) {
            console.error('Error updating activity:', error);
        }
    }

    if (!activity) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-level2">
            <Header />
            <div className="content-wrapper">
                <div id="mainContent">
                    <h2>Contenu principal</h2>
                    <p>Ici se trouve le contenu principal de votre page d'édition.</p>
                    <ActiviteForm activity={activity} setActivity={setActivity} />
                </div>
                <RightSidebar handleOnClick={handleOnClick} />
            </div>
        </div>
    )
}

export default ActivityEdit;