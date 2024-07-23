import React from "react";

const SaveButton = ({handleOnClick}) => {
    return (
        <>
        <button className="btn-primary" type='button' onClick={handleOnClick}>Enregistrer</button>
        </>
    )
}

export default SaveButton;