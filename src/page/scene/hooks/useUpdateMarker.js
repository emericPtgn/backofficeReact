import { useMarkerDispatch } from "../../../context/MarkerContext";
import { updateMarker as apiUpdateMarker } from "../../../service/api"; // Renommé ici pour éviter le conflit de noms

const useUpdateMarker = () => {
    const dispatch = useMarkerDispatch();

    const updateMarker = async (id, scene) => {
        try {
            const response = await apiUpdateMarker(id, scene, dispatch); // Appel à la fonction API renommée
            dispatch({ type: 'updateMarker', payload: response });
            return response;
        } catch (error) {
            console.error('error occurred: ', error.message);
        }
    };

    return { updateMarker };
};

export default useUpdateMarker;
