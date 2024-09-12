import { useState } from "react";

const useMarker = (initialMarker) => {
    const [marker, setMarker] = useState(initialMarker);

    // Fonction pour mettre à jour la latitude et la longitude
    const updatePosition = (latitude, longitude) => {
        setMarker((prevMarker) => ({
            ...prevMarker,
            latitude: latitude !== undefined ? latitude : prevMarker.latitude,
            longitude: longitude !== undefined ? longitude : prevMarker.longitude,
        }));
    };

    // Fonction pour mettre à jour l'icône
    const updateIcon = (icone) => {
        setMarker((prevMarker) => ({
            ...prevMarker,
            icone: icone !== undefined ? icone : prevMarker.icone,
        }));
    };

    return { marker, updatePosition, updateIcon };
};

export default useMarker;
