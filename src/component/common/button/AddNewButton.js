import React from "react";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
const AddNewButton = ({label, handleOnClick}) => {
    return (
        <>
        <div>
            <Button size="small" label={label} onClick={handleOnClick} className="btn-primary" icon="pi pi-plus" type='button'></Button>
        </div>
        
        </>
    )
}

export default AddNewButton;