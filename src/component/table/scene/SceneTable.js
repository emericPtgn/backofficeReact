import React, { useEffect } from "react";
import { useState } from "react";
import { getScenes } from "../../../service/api";

const SceneTable = () => {
    const [scenes, setScenes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchScenes = async () => {
            try {
                setIsLoading(true);
                const data = await getScenes();
                if(Array.isArray(data)){
                    setScenes(data);
                    setIsLoading(false);
                } else {
                    console.warn('No scenes found or invalid response format');
                    setScenes([]);
                }
                console.log(data);
                return data;
            } catch (error) {
                console.error('error while fetching scenes:', error);
                setError('failed to fetch Scenes:', error);
                throw error;
            } finally {
                setIsLoading(false);
            }
        };
        fetchScenes();
    }, [])

    if(isLoading){
        return <div>"loading..."</div>;
    }
    if(error){
        return <div>"error... :{error}"</div>;
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
                        {scenes.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{textAlign: 'center'}}>"create a first scene"</td>
                            </tr>
                        ): 
                        scenes.map((scene, index)=>
                            <Scene scene={scene} id={index+1}  key={index} />
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

const Scene = ({scene, id}) => {
    return (
        <>
        <tr>
            <td hidden dataset={scene.id}></td>
            <td >{id}</td>
            <td scope="row">{scene.nom}</td>
            <td>{scene.emplacement.latitude}</td>
            <td>{scene.emplacement.longitude}</td>
            <td>
                <button className="btn-primary" type="button"> <a href={`/scene-edit/${scene.id}`}>Modifier</a> </button>   
                <button type="button">Supprimer</button>               
            </td>
        </tr>
        </>
    )
}

export default SceneTable