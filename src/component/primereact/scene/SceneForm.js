import React, { useEffect } from "react";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Card } from "primereact/card";

export const SceneForm = ({scene, setScene}) => {
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setScene((scene) => ({...scene, [name] : value}));
    }

    console.log(scene)

    return (
        <Card className="d-flex">
            <NameField scene={scene} handleChange={handleChange}></NameField>
            <DescriptionField scene={scene} handleChange={handleChange}></DescriptionField>
        </Card>
    )
}

const NameField = ({scene, handleChange}) => {
    const [value, setValue] = useState(scene?.nom || '')
    return (
        <InputText 
        name="nom" 
        value={value} 
        onChange={(e) => {handleChange(e); setValue(e.target.value)}}
        placeholder="Scene rap, scene montagne ..."></InputText>
    )
}

const DescriptionField = ({scene, handleChange}) => {
    const [value, setValue] = useState(scene?.description || '')
    return (
        <InputTextarea 
        name="description" 
        value={value} 
        onChange={(e) => {handleChange(e); setValue(e.target.value)}} 
        placeholder="Retrouvez les plus grosses têtes de la pop anglaise"></InputTextarea>
    )
}