import React from "react";
import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { useMarkerState } from "../../context/MarkerContext";
const iconeScene = require('../../ressources/icone_scene.png')

const MyMap = () => {
    const { markers } = useMarkerState();
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const initLat = parseFloat(process.env.REACT_APP_GOOGLE_MAPS_INIT_LAT);
    const initLng = parseFloat(process.env.REACT_APP_GOOGLE_MAPS_INIT_LNG);

    // Debugging environment variables
    console.log("Initial Latitude:", initLat, "Initial Longitude:", initLng);

    const formattedMarkers = markers.map((marker, i) => {
        const lat = parseFloat(marker.latitude);
        const lng = parseFloat(marker.longitude);

        console.log(`Marker ${i}:`, { lat, lng });

        return {
            key: `${i}-${marker.nom}`,
            position: { lat, lng }
        };
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
            >
                {formattedMarkers.map(marker => (
                    <Marker key={marker.key} marker={marker} />
                ))}
            </Map>
        </APIProvider>
    );
}

const Marker = ({ marker }) => {
    return (
        <AdvancedMarker position={marker.position}>
            <Pin>
            <img src={iconeScene} alt="Custom Marker" style={{ width: '32px', height: '32px' }} />
            </Pin>
        </AdvancedMarker>
    );
}

export default MyMap;
