import React from "react";
import Header from "../../component/layout/levelTwo/Header";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import { useState } from "react";
import { addActivity } from "../../service/api";
import { useActiviteDispatch, useActiviteState } from "../../context/ActiviteContext";
import { ActiviteForm2 } from "../../component/primereact/activite/ActiviteForm2";

const ActivityNew = () => {
    const {activities} = useActiviteState();
    const [activity, setActivity] = useState({});
    const dispatch = useActiviteDispatch();

    const handleOnClick = async () => {
        try {
        console.log(activity);
        const response = await addActivity(activity, dispatch);
        console.log(response)
        } catch (error) {
            console.error("Error adding activity:", error);

        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        if(name.startsWith('activite_')){
            const [prefix, field, index] = name.split('_');
            if(field === 'autocomplet'){
                const isActivity = activities.find(activity => activity.nom === value);
                if(isActivity){
                    setActivity(isActivity);
                } else {
                    setActivity(prevActivity => ({...prevActivity, nom: value}));
                }
            } else {
                setActivity(prevActivity => ({...prevActivity, [field]: value}));
            }
        setActivity((activity) => ({
            ...activity, 
            [field] : value
        }))
        }
    }

    return (
        <div className="container-level2">
            <Header />
            <div className="content-wrapper">
                <div id="mainContent">
                    <h2>Contenu principal</h2>
                    <p>Ici se trouve le contenu principal de votre page d'édition.</p>
                    <p id="successMessage"></p>
                    <ActiviteForm2 onChange={handleChange} activities={activities} index={0} activity={activity} setActivity={setActivity} />
                </div>
                <RightSidebar handleOnClick={handleOnClick} />
            </div>
        </div>
    );
}

export default ActivityNew