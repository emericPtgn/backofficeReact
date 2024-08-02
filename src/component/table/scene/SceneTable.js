import React, { useEffect } from "react";
import { useState } from "react";
import { getScenes } from "../../../service/api";
import { useSceneState } from "../../../context/SceneContext";
import { SceneRow } from "./SceneRow";

const ERROR_MESSAGE = "Une erreur est survenue lors du chargement des programmations.";
const CREATE_FIRST_MESSAGE = "Créez votre première programmation.";
const ISLOADING_MESSAGE = "Chargement en cours"

const SceneTable = () => {
    const { scenes, fetchError } = useSceneState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        if(scenes || fetchError){
            setIsLoading(false)
        }
    }, [scenes, fetchError])

    if(fetchError){
        return <div>{ERROR_MESSAGE}</div>
    }
    if(isLoading){
        return <div>{ISLOADING_MESSAGE}</div>
    }
    return (
        <>
            <div className="container-table">
                <table className="table-level2"> 
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">SCENE</th>
                            <th scope="col">LATITUDE</th>
                            <th scope="col">LONGITUDE</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scenes.length === 0 || !scenes ? (
                            <tr>
                                <td colSpan="5" style={{textAlign: 'center'}}>{CREATE_FIRST_MESSAGE}</td>
                            </tr>
                        ): 
                        scenes.map((scene, index)=>
                            <SceneRow scene={scene} id={index+1}  key={index} />
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}



export default SceneTable