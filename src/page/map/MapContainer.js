import React, { useEffect, useRef, useState } from "react";
import MyMap from "../map/Map";
import DisplayInfosMap from "./DisplayInfoMap";


// Conteneur principal pour la carte et l'emoji picker
const MapContainer = ({ marker, handleClick}) => {
    return (
        <MyMap handleClick={handleClick} item={marker} />
    );
};

export default MapContainer;
