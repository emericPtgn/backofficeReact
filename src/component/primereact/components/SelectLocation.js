import React from "react";
import { SelectButton } from "primereact/selectbutton";
import { useMarkerState } from "../../../context/MarkerContext";

export default function SelectLocation({ value, onChange, typeActivity }) {
    const { markers } = useMarkerState(); 

    if (!Array.isArray(markers) || markers.length === 0) {
        return <div>No location available</div>;
    }

    // Filtrer les marqueurs selon le type d'activité
    const scenesList = markers.filter(marker => marker.type === 'scene');
    const fanZoneList = markers.filter(marker => marker.type === 'fanzone');
    const gameZoneList = markers.filter(marker => marker.type === 'gamezone');

    // Choisir la liste en fonction du type d'activité
    const ArrayToMapWith = typeActivity === 'Concert' ? scenesList : 
                           typeActivity === 'Dedicace' ? fanZoneList : 
                           typeActivity === 'Jeux' ? gameZoneList : [];


    // Créer les options pour le SelectButton
    const options = ArrayToMapWith.map((item, index) => ({
        key: index,
        label: item.nom,
        value: item.nom
    }));

    return (
        <div className="card flex justify-content-center">
            <div className="flex flex-wrap gap-3">
                <SelectButton name="location" value={value} onChange={(e) => onChange(e.value)} options={options} />
            </div>
        </div>
    );
}
