import React from "react";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
const 
AddNewButton = ({tooltip, label, handleOnClick, icon}) => {
    return (
        <div>
            <Button 
            size="small" 
            label={label} 
            onClick={handleOnClick} 
            className="btn-primary" 
            icon={icon}
            type='button' 
            rounded
            tooltip={tooltip}>
            </Button>
        </div>
    )
}

export default AddNewButton;