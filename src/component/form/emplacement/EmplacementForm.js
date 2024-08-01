import React from "react";
import { useState } from "react";

const Emplacement = () => {
    const [ emplacement, setEmplacement ] = useState('');
    return (
        <>
        <form id="emplacement">
            <div>
                <label>NOM EMPLACEMENT</label>
                <input type="text" name="nom" />
            </div>
            <div>
                <label>LATTITUDE EMPLACEMENT</label>
                <input type="text" name="latitude" />
            </div>
            <div>
                <label>LONGITUDE EMPLACEMENT</label>
                <input type="text" name="longitude" />
            </div>
        </form>
        </>
    )
}

export default Emplacement