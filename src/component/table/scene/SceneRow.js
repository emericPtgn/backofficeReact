import React from "react"


export const SceneRow = ({scene, id}) => {
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