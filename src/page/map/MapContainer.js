import React, { useEffect, useRef, useState } from "react";
import MyMap from "../map/Map";
import DisplayInfosMap from "./DisplayInfoMap";

// Conteneur principal pour la carte et l'emoji picker
const MapContainer = ({ marker, handleClick }) => {
    const containerRef = useRef(null);
    const resetEmojiPicker = useRef(null);
    console.log(marker)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (resetEmojiPicker.current) {
                // Vérifie si le clic est à l'extérieur du conteneur et de l'emoji picker
                if (containerRef.current && !containerRef.current.contains(event.target)) {
                    resetEmojiPicker.current();
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={containerRef}>
            <DisplayInfosMap marker={marker} />
            <MyMap handleClick={handleClick} item={marker} />
        </div>
    );
};

export default MapContainer;
