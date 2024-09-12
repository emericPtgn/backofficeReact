import React from "react";
import {Button} from 'primereact/button'

export default function SaveButton ({handleOnClick}) {
    return (
        <Button label="Enregistrer" icon="pi pi-check" size="small"  onClick={handleOnClick}/>
    )
}