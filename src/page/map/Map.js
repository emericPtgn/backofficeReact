import React, { useState } from "react";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";
import { useMarkerState } from "../../context/MarkerContext";
import iconeScene from '../../ressources/icon_scene_24x24.png';
import iconeCommerce from '../../ressources/icon_shop_24x24.png';

const MyMap = ({ handleClick, item }) => {
    const { markers } = useMarkerState();
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const initLat = parseFloat(process.env.REACT_APP_GOOGLE_MAPS_INIT_LAT);
    const initLng = parseFloat(process.env.REACT_APP_GOOGLE_MAPS_INIT_LNG);

    const [selectedMarker, setSelectedMarker] = useState(null); // État pour suivre le marqueur sélectionné

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
    } else if (findItem === 'gamezone') {
        filter = 'gamezone';
    } else if (findItem === 'commerce') {
        filter = 'commerce';
        iconeMarker = iconeCommerce;
    } else if (findItem === 'carte') {
        filter = null;
    }

    const newMarkers = markers.map(marker => {
        if (marker?.nom === item?.nom && marker?.type === item?.type) {
            return { ...marker, ...item };
        }
        return marker;
    });

    if (!newMarkers.find(marker => marker?.nom === item?.nom && marker.type === item.type)) {
        newMarkers.push(item);
    }

    const formattedMarkers = newMarkers
        .map((marker, i) => {
            const lat = parseFloat(marker?.latitude);
            const lng = parseFloat(marker?.longitude);
            return {
                key: `${i}-${marker?.nom}`,
                position: { lat, lng },
                type: marker?.type,
                nom: marker?.nom,
                icone: marker?.icone 
            };
        })
        .filter(marker => !isNaN(marker.position.lat) && !isNaN(marker.position.lng))
        .filter(marker => {
            if (filter === 'commerce') {
                return marker.type !== 'scene' && marker.type !== 'fanzone' && marker.type !== 'gamezone';
            } else if (filter === null) {
                return marker;
            }
            return marker.type === filter;
        });

    return (
        <APIProvider apiKey={apiKey}>
            <Map
                style={{ width: '100%', height: '500px' }}
                defaultCenter={{ lat: initLat, lng: initLng }}
                defaultZoom={19}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                mapId={'5377b317cad09bf9'}
                onClick={(position) => handleClick(position)}
            >
                {formattedMarkers.map(marker => (
                    <Marker 
                        key={marker.key} 
                        marker={marker} 
                        onClick={() => setSelectedMarker(marker)} 
                    />
                ))}

                {selectedMarker && (
                    <InfoWindow 
                        position={selectedMarker.position} 
                        onCloseClick={() => setSelectedMarker(null)} 
                    >
                        <div className="info-window-map">
                            <h4>{selectedMarker.nom}</h4>
                            <p>Type: {selectedMarker.type}</p>
                            
                        </div>
                    </InfoWindow>
                )}
            </Map>
        </APIProvider>
    );
}

const Marker = ({ marker, onClick }) => {
    return (
        <AdvancedMarker position={marker.position} gmpDraggable={true} onClick={onClick}>
            {marker.icone === iconeScene ? (
                <img src={marker.icone} alt="Icon" style={{ width: '32px', height: '32px' }} />
            ) : (
                <span style={{ fontSize: '32px' }}>{marker.icone}</span>
            )}
        </AdvancedMarker>
    );
}

export default MyMap;
