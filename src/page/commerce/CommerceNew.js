import React from "react";
import CommerceForm from "../../component/primereact/commerce/CommerceForm";
import Header from "../../component/layout/levelTwo/Header";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import { useCommercesDispatch, useCommercesState } from "../../context/CommerceContext";
import { useState, useRef } from "react";
import { Toast } from 'primereact/toast';
import SetCommerceMap from "./SetCommerceMap";
import { addMarker } from "../../service/api";
import handleClicktoAdd from "../../utils/handleClickToAdd";
import { useMarkerState } from "../../context/MarkerContext";

const CommerceNew = () => {
    const markerModel = { 
        nom: '', 
        description: '', 
        icone : '', 
        type: 'commerce', 
        latitude : null, 
        longitude : null, 
        groupe : '', 
        sousGroupe: ''}

    const [commerce, setCommerce] = useState(markerModel);
    const { markers } = useMarkerState();
    const dispatch = useCommercesDispatch();
    const toast = useRef(null);


    const handleChange = (e) => {
        console.log('click')
        const { name, value } = e.target;
        console.log('name:', name, 'value:', value)
        setCommerce((commerce) =>
            ({ ...commerce,
                [name]: value
            })
        )
    }

    const onClickAdd = async () => {
        try {
            await handleClicktoAdd( dispatch, commerce, addMarker, toast )
        } catch (error) {
            console.error('Error during update', error);
        }
    }
    

    return (
        <div className="container-level2">
            <Header />
            <Toast ref={toast} />
            <div className="content-wrapper">
                <div id="mainContent">
                    <h2>Contenu principal</h2>
                    <p>Ici se trouve le contenu principal de votre page d'édition.</p>
                    <CommerceForm commerce={commerce} setCommerce={setCommerce} 
                    commerces={markers} onChange={handleChange} />
                    <SetCommerceMap commerce={commerce} setCommerce={setCommerce} />
                </div>
                <RightSidebar handleOnClick={onClickAdd} />
            </div>
        </div>
    );
}

export default CommerceNew;
