import React, { useState } from "react";
import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { useMarkerState } from "../../context/MarkerContext";
import iconeScene from '../../ressources/icon_scene_24x24.png';
import iconBurger from '../../ressources/icon_burger_24x24.png';
import iconChineseFood from '../../ressources/icon_chineseFood_24x24.png';
import iconPizza from '../../ressources/icon_pizza_24x24.png';
import iconToilet from '../../ressources/icon_toilet_24x24.png';

const ScenesMap = ({ handleClick }) => {
    const { markers } = useMarkerState();
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const initLat = parseFloat(process.env.REACT_APP_GOOGLE_MAPS_INIT_LAT);
    const initLng = parseFloat(process.env.REACT_APP_GOOGLE_MAPS_INIT_LNG);

    // Extraction de la partie pertinente du chemin de l'URL
    const url = window.location.pathname;
    let pathParts = url.split('/');
    let findItem = pathParts[1].split('-')[0];

    let filter = '';
    if (findItem === 'scene') {
        filter = 'scene';
    } else if (findItem === 'fanzone') {
        filter = 'fanzone';
    } else if (findItem === 'gamezone') {
        filter = 'gamezone';
    } else if (findItem === 'commerce') {
        // Filtrer pour les types qui ne sont pas 'scene', 'fanzone' ou 'gamezone'
        filter = 'commerce';
    }

    const formattedMarkers = markers
        .map((marker, i) => {
            const lat = parseFloat(marker.latitude);
            const lng = parseFloat(marker.longitude);
            return {
                key: `${i}-${marker.nom}`,
                position: { lat, lng },
                type: marker.type,
                nom: marker.nom
            };
        })
        .filter(marker => !isNaN(marker.position.lat) && !isNaN(marker.position.lng))
        .filter(marker => {
            if (filter === 'commerce') {
                return marker.type !== 'scene' && marker.type !== 'fanzone' && marker.type !== 'gamezone';
            }
            return marker.type === filter;
        });

    return (
        <APIProvider apiKey={apiKey}>
            <Map
                style={{ width: '100vw', height: '100vh' }}
                defaultCenter={{ lat: initLat, lng: initLng }}
                defaultZoom={18}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                mapId={'5377b317cad09bf9'}
                onClick={(position) => handleClick(position)}
            >
                {formattedMarkers.map(marker => (
                    <Marker key={marker.key} marker={marker} />
                ))}
            </Map>
        </APIProvider>
    );
}

const Marker = ({ marker }) => {
    const [selectedMarker, setSelectedMarker] = useState(false);
    return (
        <AdvancedMarker position={marker.position}>
            <Pin>
                <img src={iconeScene} alt="Custom Marker" style={{ width: '32px', height: '32px' }} />
            </Pin>
        </AdvancedMarker>
    );
}

export default ScenesMap;
