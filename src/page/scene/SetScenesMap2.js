// SetScenesMap2.js
import React from "react";
import useMarker from '../map/hooks/useMarker';
import EmojiPickerWrapper from "../map/EmojiPickerWrapper";
import MapContainer from "../map/MapContainer";
import { useState } from "react";


const SetScenesMap2 = ({ scene, setScene }) => {

    const [emojiPickerKey, setEmojiPickerKey] = useState(0);
    const resetEmojiPicker = () => setEmojiPickerKey(prevKey => prevKey + 1);

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
    }

    return (
        <>
            <EmojiPickerWrapper item={scene} resetEmojiPicker={resetEmojiPicker} emojiPickerKey={emojiPickerKey} onEmojiClick={onEmojiClick} setScene={setScene} scene={scene} onDeleteMarker={handleDeleteMarker} />
            <MapContainer marker={scene} handleClick={handleClick} onEmojiClick={onEmojiClick} setScene={setScene} scene={scene} onDeleteMarker={handleDeleteMarker}  />
        </>
    );
};

export default SetScenesMap2;
