import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from '../../component/layout/levelTwo/Header.js';
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import CommerceForm from "../../component/primereact/commerce/CommerceForm.js";
import { useParams } from "react-router-dom";
import { useCommercesDispatch, useCommercesState } from "../../context/CommerceContext.js";
import { updateMarker } from "../../service/api.js";
import SetCommerceMap from "./SetCommerceMap.js";
import { useMarkerState } from "../../context/MarkerContext.js";
import FindByIdAndSetDocument from "../../utils/findByIdAndSetDocument.js";
import handleClickToUpdate from "../../utils/handleClickToUpdate.js";
import { Toast } from "primereact/toast";

const CommerceEdit = () => {
    const { id } = useParams();
    const { markers } = useMarkerState();
    const dispatch = useCommercesDispatch();
    const [commerce, setCommerce] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState(null);
    const toast = useRef(null);

    const commerces = useMemo(() => {
        if (!markers) return [];
        return markers.filter(marker => marker.type === 'commerce');
    }, [markers]);

    FindByIdAndSetDocument(commerces, id, setCommerce, setStatus, setIsLoading);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setCommerce(prevCommerce => ({
            ...prevCommerce,
            [name]: value
        }));
    };
    
    const onClickUpdate = async () => {
        try {
            await handleClickToUpdate(id, dispatch, commerce, updateMarker, toast)
        } catch (error) {
            console.error('Error during update', error);
        }
    }

    if (isLoading) {
        return <div>Chargement en cours</div>;
    } else if (!commerce){
        return <div>Commerce non trouvé</div>;
    }

    return (
        <div className="container-level2">
            <Header />
            <div className="content-wrapper">
                <div id="mainContent">
                    <Toast ref={toast}/>
                    <h2>Contenu principal</h2>
                    <p>Ici se trouve le contenu principal de votre page d'édition.</p>
                    {commerce && (
                        <>
                            <CommerceForm commerces={commerces} commerce={commerce} setCommerce={setCommerce} onChange={handleChange}/>
                            <SetCommerceMap commerce={commerce} setCommerce={setCommerce} />
                        </>
                    )}
                </div>
                <RightSidebar handleOnClick={onClickUpdate} />
            </div>
        </div>
    );
}

export default CommerceEdit;

    // const handleOnClick = async () => {
    //     try {
    //         console.log("Commerce data:", commerce);
    //         const response = await updateCommerce(id, dispatch, commerce);
    //         console.log("Update response:", response);
    //     } catch (error) {
    //         console.error("Error updating commerce:", error);
    //     }
    // };