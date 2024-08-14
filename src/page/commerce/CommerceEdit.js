import React, { useEffect, useMemo, useState } from "react";
import Header from '../../component/layout/levelTwo/Header.js';
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import CommerceForm from "../../component/primereact/commerce/CommerceForm.js";
import { useParams } from "react-router-dom";
import { useCommercesDispatch, useCommercesState } from "../../context/CommerceContext.js";
import { updateCommerce } from "../../service/api.js";
import { Toast } from 'primereact/toast';


const CommerceEdit = () => {
    const { id } = useParams();
    const { commerces } = useCommercesState();
    const dispatch = useCommercesDispatch();
    const [commerce, setCommerce] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState(null);

    const memoCommerces = useMemo(() => commerces, [commerces]);

    useEffect(() => {
        if (memoCommerces && memoCommerces.length > 0) {
            const foundCommerce = memoCommerces.find(commerce => commerce.id === id);
            if (foundCommerce) {
                setCommerce(foundCommerce);
                setStatus("data found");
            } else {
                setStatus("no data found");
            }
            setIsLoading(false);
        } else {
            setStatus("no data found");
            setIsLoading(false);
        }
    }, [memoCommerces, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        if(name === 'typeCommerce'){
            const updatedType = {nom : value};
            setCommerce(prevCommerce => ({...prevCommerce, [name] : updatedType}));
        } else if (name === 'typeProduit'){
            const updatedType = {nom: value}
            setCommerce(prevCommerce => ({...prevCommerce, [name] : updatedType}));
        } else {
            setCommerce(prevCommerce => ({
                ...prevCommerce,
                [name]: value
            }));
        }
    };

    const handleOnClick = async () => {
        try {
            console.log("Commerce data:", commerce);
            const response = await updateCommerce(id, dispatch, commerce);
            console.log("Update response:", response);
        } catch (error) {
            console.error("Error updating commerce:", error);
        }
    };

    if (isLoading) {
        return <div>Chargement en cours</div>;
    }
    
    return (
        <div className="container-level2">
            <Header />
            <div className="content-wrapper">
                <div id="mainContent">
                    <h2>Contenu principal</h2>
                    <p>Ici se trouve le contenu principal de votre page d'édition.</p>
                    {commerce && (
                        <CommerceForm
                            commerces={memoCommerces}
                            commerce={commerce}
                            setCommerce={setCommerce}
                            onChange={handleChange}
                        />
                    )}
                </div>
                <RightSidebar handleOnClick={handleOnClick} />
            </div>
        </div>
    );
}

export default CommerceEdit;
