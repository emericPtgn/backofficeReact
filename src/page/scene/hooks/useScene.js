// useScene.js
import { useState } from "react";

const useScene = () => {
    const [scene, setScene] = useState({
        nom: '',
        description: '',
        type: 'scene',
        latitude: '',
        longitude: ''
    });

    return { scene, setScene };
};

export default useScene;