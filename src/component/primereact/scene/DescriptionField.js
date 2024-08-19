import React from "react";
import { InputTextarea } from "primereact/inputtextarea";

const DescriptionField = ({ value, onChange }) => {
    return (
        <div className="field">
            <label htmlFor="description">Description</label>
            <InputTextarea 
                id="description" 
                name="description" 
                value={value} 
                onChange={(e) => onChange("description", e.target.value)} 
                rows={5} 
            />
        </div>
    );
};

export default React.memo(DescriptionField);