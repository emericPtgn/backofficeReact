import React from "react";

const AddNewButton = ({handleOnClick}) => {
    return (
        <>
        <button onClick={handleOnClick} className="btn-primary" type='button'>Ajouter</button>
        </>
    )
}

export default AddNewButton;