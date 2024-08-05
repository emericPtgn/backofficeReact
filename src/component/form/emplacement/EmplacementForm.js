import React, { useState } from "react";

const EmplacementForm = ({emplacement, handleOnChangeEmplacement}) => {
    const [error, setError] = useState("");

    const handleNumericInput = (e) => {
        const { name, value } = e.target;
        // Permet seulement les chiffres et un point décimal
        if (/^-?\d*\.?\d*$/.test(value) || value === '') {
            handleOnChangeEmplacement(e);
            setError("");
        } else {
            setError(`Veuillez entrer uniquement des chiffres pour ${name}`);
            // Optionnel : empêcher la mise à jour de la valeur invalide
            e.preventDefault();
        }
    };

    return (
        <>
        <form id="emplacement">
            <div>
                <label>NOM EMPLACEMENT</label>
                <input 
                    type="text" 
                    name="nom" 
                    value={emplacement.nom || ''} 
                    onChange={handleOnChangeEmplacement}
                />
            </div>
            <div>
                <label>LATITUDE EMPLACEMENT</label>
                <input 
                    type="text" 
                    name="latitude" 
                    value={emplacement.latitude || ''} 
                    onChange={handleNumericInput}
                />
            </div>
            <div>
                <label>LONGITUDE EMPLACEMENT</label>
                <input 
                    type="text" 
                    name="longitude" 
                    value={emplacement.longitude || ''} 
                    onChange={handleNumericInput}
                />
            </div>
            {error && <div style={{color: 'red'}}>{error}</div>}
        </form>
        </>
    )
}

export default EmplacementForm;