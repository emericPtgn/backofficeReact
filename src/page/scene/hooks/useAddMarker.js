// useAddMarker.js
import { addMarker } from "../../../service/api";
import { useMarkerDispatch } from "../../../context/MarkerContext";

const useAddMarker = () => {
    const dispatch = useMarkerDispatch();

    const addNewMarker = async (scene) => {
        try {
            await addMarker(scene, dispatch);
        } catch (error) {
            console.error('error occured: ', error);
        }
    };

    return { addNewMarker };
};

export default useAddMarker;