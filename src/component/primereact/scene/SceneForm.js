import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Card } from "primereact/card";

import NameField from "./NameField";
import DescriptionField from "./DescriptionField";

export const SceneForm = ({ scene, setScene }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setScene((prevScene) => ({ ...prevScene, [name]: value }));
    };


    return (
        <Card className="d-flex">
            <NameField scene={scene} onChange={handleChange} />
            <DescriptionField scene={scene} onChange={handleChange} />
        </Card>
    );
};



