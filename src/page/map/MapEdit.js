import React, { useRef, useState, useCallback } from "react";
import Header from "../../component/layout/levelTwo/Header";
import { Toast } from "primereact/toast";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import MapBuilder from "./MapBuilder";
import { useMarkerState, useMarkerDispatch } from "../../context/MarkerContext";
import { getMarkers, updateMarker } from "../../service/api";
import { Button } from 'primereact/button';

export default function MapEdit() {
    const { markers, editedMarkers } = useMarkerState();
    const dispatch = useMarkerDispatch();
    const toast = useRef(null);

    const [selectedMarker, setSelectedMarker] = useState(null);

    const handleMarkerSelect = useCallback((marker) => {
        setSelectedMarker(marker);
    }, []);

    const handleMarkerUpdate = useCallback((updatedMarker) => {
        dispatch({
            type: 'updateMarker',
            payload: {
                id: updatedMarker.id,
                data: updatedMarker,
            }
        });
    }, [dispatch]);
    
    // Mise à jour globale des marqueurs modifiés
    const onClickUpdate = async () => {
        try {
            await Promise.all(editedMarkers.map(async (marker) => {
                await updateMarker(marker.id, marker, dispatch);
            }));
            getMarkers(dispatch);
            toast.current.show({severity:'success', summary: 'Succès', detail:'Tous les marqueurs ont été mis à jour', life: 3000});
        } catch (error) {
            console.error('Error during update', error);
            toast.current.show({severity:'error', summary: 'Erreur', detail:'Erreur lors de la mise à jour des marqueurs', life: 3000});
        }
    };

    return (
        <div className="container-level2">
            <Header />
            <Toast ref={toast} />
            <div className="content-wrapper">
                <div id="mainContent">
                    <div>
                        <h2>Contenu principal</h2>
                        <p>Ici se trouve le contenu principal de votre page d'édition.</p>
                    </div>
                    <MapBuilder 
                        markers={markers}
                        selectedMarker={selectedMarker}
                        onMarkerSelect={handleMarkerSelect}
                        onMarkerUpdate={handleMarkerUpdate}
                    />
                </div>
                <RightSidebar 
                    handleOnClick={onClickUpdate} 
                    isUpdateEnabled={editedMarkers.length > 0}
                />
            </div>
        </div>
    );
}
