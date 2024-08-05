import React, { useState } from "react";
import EmplacementForm from "../emplacement/EmplacementForm";

const SceneForm = ({scene, setScene}) => {
    const handleOnChange = (e) => {
        const {name, value} = e.target;
        console.log("Changing", name, "to", value);
        setScene(prevScene => {
            const updatedScene = {...prevScene, [name]: value};
            console.log("Updated scene state:", updatedScene);
            return updatedScene;
        });
    }

    const handleOnChangeEmplacement = (e) => {
        const {name, value} = e.target;
        setScene(prevScene => {
            const updatedEmplacement = {...prevScene.emplacement, [name]: value};
            return {...prevScene, emplacement: updatedEmplacement};
        });
    }

    return (
        <>
        <form>
            <input type="text" name="nom" value={scene.nom || ''} onChange={handleOnChange} placeholder="scene B, scene rap..."/>
            <EmplacementForm 
                emplacement={scene.emplacement || {}} 
                handleOnChangeEmplacement={handleOnChangeEmplacement} 
            />
        </form>
        </>
    )
}

export default SceneForm;