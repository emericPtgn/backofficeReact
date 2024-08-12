import React from "react";
import Header from "../../component/layout/levelTwo/Header";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import { useState } from "react";
import { addActivity } from "../../service/api";
import { useActiviteDispatch } from "../../context/ActiviteContext";
import { ActiviteForm2 } from "../../component/primereact/activite/ActiviteForm2";

const ActivityNew = () => {
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
    return (
        <div className="container-level2">
            <Header />
            <div className="content-wrapper">
                <div id="mainContent">
                    <h2>Contenu principal</h2>
                    <p>Ici se trouve le contenu principal de votre page d'édition.</p>
                    <p id="successMessage"></p>
                    <ActiviteForm2 activity={activity} setActivity={setActivity} />
                </div>
                <RightSidebar handleOnClick={handleOnClick} />
            </div>
        </div>
    );
}

export default ActivityNew