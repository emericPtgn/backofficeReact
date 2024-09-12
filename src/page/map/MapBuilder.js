import React, { useState, useEffect } from "react";
import MyMap from "./Map";
import MarkerFactory from "./MarkerFactory";
import { useMarkerState, useMarkerDispatch } from "../../context/MarkerContext";

export default function MapBuilder() {
    const state = useMarkerState();
    const dispatch = useMarkerDispatch();
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [isEditing, setIsEditing] = useState(false);


    const handleClick = (position) => {
        console.log('handle map click')

        if (selectedMarker) {
            dispatch({
                type: 'updateMarker',
                payload: {
                    id: selectedMarker.id,
                    latitude : position.detail.latLng.lat,
                    longitude : position.detail.latLng.lng,
                }
            });
        }
    };

    const onEmojiClick = (emoji) => {
        console.log(emoji.emoji)
        if (selectedMarker) {
            dispatch({
                type: 'updateEmoji',
                payload: {
                    id: selectedMarker.id,
                    icone: emoji.emoji
                }
            });
        }
    };

    const handleDeleteMarker = () => {
        if (selectedMarker) {
            dispatch({ type: 'deleteMarker', payload: selectedMarker.id });
            setSelectedMarker(null);
        }
    };

    const handleSelectMarker = (marker) => {
        if(selectedMarker){
            if(selectedMarker.id == marker.id){
                setSelectedMarker(null)
            } else {
                setSelectedMarker(marker);
            }
        } else {
            console.log(marker)
            setSelectedMarker(marker);
        }
    };

    const handleSave = () => {
        // Logique pour sauvegarder les modifications
        setIsEditing(false);
    };

    const handleCancel = () => {
        dispatch({ type: 'resetMarker', payload: selectedMarker.id });
        setIsEditing(false);
        setSelectedMarker(null);
    };

    return (
        <div id="map-container">
            <MyMap 
                handleClick={handleClick} 
                markers={state.markers} 
            />
            <MarkerFactory 
                onDeleteMarker={handleDeleteMarker}
                selectedMarker={selectedMarker}
                onEmojiClick={onEmojiClick}
                onSelectMarker={handleSelectMarker}
                isEditing={isEditing}
                onSave={handleSave}
                onCancel={handleCancel}
            />
        </div>
    );
}
