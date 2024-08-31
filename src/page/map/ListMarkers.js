import React, { useState } from "react";
import { ListBox } from "primereact/listbox";
import { useMarkerState } from "../../context/MarkerContext";
import 'primeicons/primeicons.css';

const ListMarkers = ({ onSelectMarker, selectedMarker, onDeleteClick, onUndo }) => {
    const state = useMarkerState();
    const [enabled, setEnabled] = useState(false);

    // Regrouper les marqueurs par type
    const groupedMarkers = state.markers.reduce((acc, marker) => {
        const type = marker.type || 'Uncategorized';
        if (!acc[type]) {
            acc[type] = {
                label: type,
                code: type,
                items: []
            };
        }
        acc[type].items.push({ label: marker.nom, value: marker });
        return acc;
    }, {});

    const groupedMarkersArray = Object.values(groupedMarkers);

    // Template pour les éléments de la liste
    const itemTemplate = (option) => {
        return (
            <div className="d-flex align-items-center gap-2">
                <div style={{ flex: 1 }}>{option.label}</div>
                <div 
                    className="pi pi-undo" 
                    onClick={(e) => {
                        e.stopPropagation(); // Empêche la propagation de l'événement
                        console.log("Undo clicked"); // Debug log
                        onUndo();
                    }} 
                    style={{ cursor: 'pointer' }}
                ></div>
                <div 
                    className="pi pi-times" 
                    onClick={(e) => {
                        e.stopPropagation(); // Empêche la propagation de l'événement
                        console.log("Delete clicked"); // Debug log
                        onDeleteClick();
                    }} 
                    style={{ cursor: 'pointer' }}
                ></div>
            </div>
        );
    };


    // Template pour les groupes d'éléments
    const groupTemplate = (option) => {
        return (
            <div className="flex align-items-center gap-2">
                <div>{option.label}</div>
            </div>
        );
    };

    return (
        <div className="card flex justify-content-center list-markers">
            <ListBox 
                value={selectedMarker} 
                onChange={(e) => onSelectMarker(e.value)} 
                options={groupedMarkersArray} 
                optionLabel="label" 
                optionGroupLabel="label" 
                optionGroupChildren="items" 
                itemTemplate={itemTemplate}
                optionGroupTemplate={groupTemplate} 
                className="w-full md:w-14rem" 
                listStyle={{ maxHeight: '250px' }} 
            />
        </div>
    );
}

export default ListMarkers;
