import React, { useState } from "react";
import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { useMarkerState } from "../../context/MarkerContext";
import iconeScene from '../../ressources/icon_scene_24x24.png';
import iconeCommerce from '../../ressources/icon_shop_24x24.png';

const MyMap = ({ handleClick }) => {
    const { markers } = useMarkerState();
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const initLat = parseFloat(process.env.REACT_APP_GOOGLE_MAPS_INIT_LAT);
    const initLng = parseFloat(process.env.REACT_APP_GOOGLE_MAPS_INIT_LNG);

    // Extraction de la partie pertinente du chemin de l'URL
    const url = window.location.pathname;
    let pathParts = url.split('/');
    let findItem = pathParts[1].split('-')[0];

    let filter = '';
    let iconeMarker = '';
    if (findItem === 'scene') {
        filter = 'scene';
        iconeMarker = iconeScene;
    } else if (findItem === 'fanzone') {
        filter = 'fanzone';
        // iconeMarker = 
    } else if (findItem === 'gamezone') {
        filter = 'gamezone';
        // iconeMarker =
    } else if (findItem === 'commerce') {
        filter = 'commerce';
        iconeMarker = iconeCommerce;
    } else if (findItem === 'map') {
        filter = 'scene';
    }

    const formattedMarkers = markers
        .map((marker, i) => {
            const lat = parseFloat(marker.latitude);
            const lng = parseFloat(marker.longitude);
            return {
                key: `${i}-${marker.nom}`,
                position: { lat, lng },
                type: marker.type,
                nom: marker.nom,
                icone: iconeMarker
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
        <AdvancedMarker 
            position={marker.position}
            gmpDraggable={false}
        >
        <div>
        <img src={marker.icone} />
        </div>
        </AdvancedMarker>
    );
}

export default MyMap;
