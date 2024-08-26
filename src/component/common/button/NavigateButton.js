import React from "react";
import { Button } from "primereact/button";

export default function NavigateButton({label}){
    const handleClick = () => {
        window.open('https://app.testdwm.fr', '_blank')
    }
    return (
        <Button label={label} link onClick={handleClick}>
            <a href="https://app.testdwm.fr" target="_blank" rel="noopener noreferrer"></a>
        </Button>
    )
}