import React, { useState, useEffect } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { useMarkerState } from "../../../context/MarkerContext";

export const AutoCompletType = ({ value, onChange }) => {
    const state = useMarkerState();
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (Array.isArray(state?.markers) && state?.markers.length > 0) {
            const uniqueTypes = [...new Set(state.markers.map(marker => marker.type))];
            setItems(uniqueTypes);
        }
    }, [state?.markers]);

    const search = (e) => {
        let filteredItems;
        if (!e.query.trim().length) {
            filteredItems = Array.isArray(state?.markers)
                ? [...new Set(state.markers.map(marker => marker.type))]
                : [];
        } else {
            filteredItems = Array.isArray(state?.markers)
                ? [...new Set(state.markers
                    .map(marker => marker.type)
                    .filter(item => item.toLowerCase().includes(e.query.toLowerCase())))]
                : [];
        }
        setItems(filteredItems);
    };

    return (
        <AutoComplete 
            value={value || ''} 
            name="type"
            suggestions={items || []} 
            completeMethod={search} 
            onChange={onChange} // Pass the event directly
            placeholder="Type Marker"
            dropdown
        />
    );
};
