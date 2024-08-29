import React from "react";
import { InputText } from "primereact/inputtext";
import { Tooltip } from 'primereact/tooltip';

const NameField = ({ value, onChange }) => {
    return (
        <div>
            <InputText 
                id="nom" 
                name="nom" 
                value={value} 
                onChange={(e) => onChange("nom", e.target.value)}
                placeholder="Nom de la scène ..."
                tooltip='Nom de la scène'
            />
        </div>
    );
};

export default React.memo(NameField);