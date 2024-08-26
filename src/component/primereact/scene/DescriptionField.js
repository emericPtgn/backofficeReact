import React from "react";
import { InputTextarea } from "primereact/inputtextarea";

const DescriptionField = ({ value, onChange }) => {
    return (
        <div className="field">
            <InputTextarea 
                id="description" 
                name="description" 
                value={value} 
                onChange={(e) => onChange("description", e.target.value)} 
                rows={5} 
                placeholder="Description.."
            />
        </div>
    );
};

export default React.memo(DescriptionField);