import React, { useState } from "react";
import EmojiPickerWrapper from "./EmojiPickerWrapper";
import MapForm from "../../component/primereact/map/MapForm";
import ListMarkers from "./ListMarkers";

export default function MarkerFactory({ 
    selectedMarker, 
    onDeleteMarker, 
    onEmojiClick, 
    onChange, 
    onSelectMarker, 
    isEditing,
    onSave,
    onCancel
}) {
    const [emojiPickerKey, setEmojiPickerKey] = useState(0);

    const resetEmojiPicker = () => setEmojiPickerKey((prevKey) => prevKey + 1);

    const handleEmojiClick = (emoji) => {
        onEmojiClick(emoji);
        resetEmojiPicker();
    };

    const handleUndo = () => {
        // Implémenter la logique d'annulation
        console.log("Undo action triggered");
    };
    

    return (
        <div>
            <EmojiPickerWrapper
                selectedMarker={selectedMarker}
                onEmojiClick={handleEmojiClick}
                onDeleteMarker={onDeleteMarker}
                emojiPickerKey={emojiPickerKey}
                resetEmojiPicker={resetEmojiPicker}
            />
            <ListMarkers onSelectMarker={onSelectMarker} selectedMarker={selectedMarker} onUndo={handleUndo} />
        </div>
    );
}