// SetScenesMap2.js
import React from "react";
import useMarker from '../map/hooks/useMarker';
import EmojiPickerWrapper from "../map/EmojiPickerWrapper";
import MapContainer from "../map/MapContainer";
import { useMarkerDispatch } from "../../context/MarkerContext";
import { deleteMarker } from "../../service/api";
import { redirect } from "react-router-dom";

const SetScenesMap2 = ({ scene, setScene }) => {
    const dispatch = useMarkerDispatch();
    const handleClick = (position) => {
        setScene({ ...scene, 
            latitude: position.detail.latLng.lat, 
            longitude: position.detail.latLng.lng });
    };

    const onEmojiClick = (emoji) => {
        setScene({ ...scene, 
            icone: emoji.emoji });
    };

    
    const handleDeleteMarker = () => {
        setScene({...scene, latitude : null, longitude : null, icone : null});
        // let response = deleteMarker(scene.id, dispatch)
        // if(response === 'Marker successfully deleted')
        // redirect('https://localhost:3000/scene')
    }

    return (
        <>
            <MapContainer marker={scene} handleClick={handleClick} onEmojiClick={onEmojiClick} setScene={setScene} scene={scene} onDeleteMarker={handleDeleteMarker}  />
        </>
    );
};

export default SetScenesMap2;
