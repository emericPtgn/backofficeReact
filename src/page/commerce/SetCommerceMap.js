import React from "react";
import MapContainer from "../map/MapContainer";
import EmojiPickerWrapper from "../map/EmojiPickerWrapper";
import { useUpdateEffect } from "primereact/hooks";

const SetCommerceMap = ({ commerce, setCommerce }) => { 
    
    const handleClick = (position) => {
        setCommerce((prevCommerce) => ({ ...prevCommerce, marker: { ...prevCommerce.marker, latitude :position.detail.latLng.lat, longitude : position.detail.latLng.lng } }));
    };

    const onEmojiClick = (emoji) => {
        setCommerce((prevCommerce) => ({ ...prevCommerce, marker : { ...prevCommerce.marker, icone : emoji.emoji} }))};

    const handleDeleteMarker = () => {
        setCommerce((prevCommerce) => ({ ...prevCommerce, marker : {...prevCommerce.marker, latitude : null, longitude : null, icone : null} }));
        // let response = deleteMarker(scene.id, dispatch)
        // if(response === 'Marker successfully deleted')
        // redirect('https://localhost:3000/scene')
    }


    return (
        <>
            <EmojiPickerWrapper onEmojiClick={onEmojiClick} setCommerce={setCommerce} commerce={commerce} onDeleteMarker={handleDeleteMarker} />
            <MapContainer marker={commerce.marker} handleClick={handleClick} />
        </>
    );
};

export default SetCommerceMap;
