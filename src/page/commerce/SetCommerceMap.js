import React from "react";
import MapContainer from "../map/MapContainer";
import EmojiPickerWrapper from "../map/EmojiPickerWrapper";
import { useUpdateEffect } from "primereact/hooks";
import { useState } from "react";

const SetCommerceMap = ({ commerce, setCommerce }) => { 
    
    const [emojiPickerKey, setEmojiPickerKey] = useState(0);
    const resetEmojiPicker = () => setEmojiPickerKey(prevKey => prevKey + 1);
    const handleClick = (position) => {
        setCommerce((prevCommerce) => ({ ...prevCommerce, latitude :position.detail.latLng.lat, longitude : position.detail.latLng.lng }));
    };

    const onEmojiClick = (emoji) => {
        setCommerce((prevCommerce) => ({ ...prevCommerce, icone: emoji.emoji }));
        resetEmojiPicker(); // Move this inside the function
    };
    

    const handleDeleteMarker = () => {
        setCommerce((prevCommerce) => ({ ...prevCommerce, latitude : null, longitude : null, icone : null }));
        // let response = deleteMarker(scene.id, dispatch)
        // if(response === 'Marker successfully deleted')
        // redirect('https://pro.testdwm.fr/scene')
    }

    return (
        <>

            <EmojiPickerWrapper item={commerce} 
            resetEmojiPicker={resetEmojiPicker} 
            emojiPickerKey={emojiPickerKey} 
            onEmojiClick={onEmojiClick} 
            setCommerce={setCommerce} 
            commerce={commerce} 
            onDeleteMarker={handleDeleteMarker} />

            <MapContainer marker={commerce} handleClick={handleClick} />

        </>
    );
};

export default SetCommerceMap;
