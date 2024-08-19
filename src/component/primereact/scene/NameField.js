import React from "react";
import { InputText } from "primereact/inputtext";

const NameField = ({ value, onChange }) => {
    return (
        <div className="field">
            <label htmlFor="nom">Nom</label>
            <InputText 
                id="nom" 
                name="nom" 
                value={value} 
                onChange={(e) => onChange("nom", e.target.value)} 
            />
        </div>
    );
};

export default React.memo(NameField);