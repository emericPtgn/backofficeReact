import React, { useEffect, useState, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import MyMap from "../map/Map";
import { useUpdateEffect } from "primereact/hooks";

const SetScenesMap = ({ scene, setScene }) => {
  const [latLng, setLatLng] = useState('');
  const [icone, setIcone] = useState('');
  const [marker, setMarker] = useState({});
  const [emojiPickerKey, setEmojiPickerKey] = useState(0);
  const emojiPickerRef = useRef(null);
  const containerRef = useRef(null);

  const handleClick = (position) => {
    const newLatLng = position.detail.latLng;
    setLatLng(newLatLng);
    setMarker((marker) => ({...marker, latitude : newLatLng.lat, longitude : newLatLng.lng}));
    setScene((scene) => ({...scene, latitude: newLatLng.lat, longitude : newLatLng.lng}));
    console.log(newLatLng);
  };

  const onEmojiClick = (event) => {
    setIcone(event.emoji);
    setScene((scene) => ({...scene, icone : event.emoji}))
    resetEmojiPicker();
  };

  const previewConfig = {
    showPreview: false,
  };

  const reactions = [
    "1f600", "1f601", "1f602", "1f603",
  ];

  useUpdateEffect(() => {
    console.log('scene : ', scene, 'marker :', marker);
  }, [scene, marker]);

  const handleReactionClick = () => {
    resetEmojiPicker();
  }

  const resetEmojiPicker = () => {
    setEmojiPickerKey(prevKey => prevKey + 1);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        // Vérifier si le clic est à l'extérieur du conteneur
        if (containerRef.current && !containerRef.current.contains(event.target)) {
          resetEmojiPicker();
        } else {
          // Vérifier si le clic est sur les côtés, au-dessus ou en dessous du panneau
          const emojiPickerRect = emojiPickerRef.current.getBoundingClientRect();
          const { clientX, clientY } = event;

          if (
            clientX < emojiPickerRect.left ||
            clientX > emojiPickerRect.right ||
            clientY < emojiPickerRect.top ||
            clientY > emojiPickerRect.bottom
          ) {
            resetEmojiPicker();
          }
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <div>
        <div ref={emojiPickerRef}>
          <EmojiPicker
            key={emojiPickerKey}
            reactionsDefaultOpen={true}
            reactions={reactions}
            onReactionClick={handleReactionClick}
            previewConfig={previewConfig}
            onEmojiClick={onEmojiClick}
          />
        </div>
        <DisplayEmojiAndCoordonates marker={marker} scene={scene} />
      </div>
      <MyMap handleClick={handleClick} item={scene} />
    </div>
  );
};

export default SetScenesMap;

const DisplayEmojiAndCoordonates = ({ marker, scene }) => {
  let icone = marker.icone ? marker.icone : scene.icone;
  let isPlaced = scene.latitude && scene.longitude ? 'oui' : 'non';
  return (
    <>
      <div>
        <p>
          Icone {scene?.nom} : <span>{icone}</span>
        </p>
        <p>
          Marker placé : <span>{isPlaced}</span>
        </p>
      </div>
    </>
  );
};
