import React from "react";
import CommerceForm from "../../component/primereact/commerce/CommerceForm";
import Header from "../../component/layout/levelTwo/Header";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import { useCommercesDispatch, useCommercesState } from "../../context/CommerceContext";
import { useState, useRef } from "react";
import { useUpdateEffect } from "primereact/hooks";
import { addCommerce } from "../../service/api";
import { Toast } from 'primereact/toast';

const CommerceNew = () => {
    const commerceModel = { nom: '', description: '', typeCommerce: { nom: '' }, typeProduit: { nom: '' }, photos: [] }

    const [commerce, setCommerce] = useState(commerceModel);
    const { commerces } = useCommercesState();
    const dispatch = useCommercesDispatch();
    const toast = useRef(null);

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Update', detail: 'Commerce mis à jour' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'typeProduit') {
            setCommerce((commerce) =>
                ({ ...commerce,
                    typeProduit: ({ ...commerce.typeProduit,
                        nom: value
                    })
                })
            )
        } else if (name === 'typeCommerce') {
            setCommerce((commerce) =>
                ({ ...commerce,
                    typeCommerce: ({ ...commerce.typeCommerce,
                        nom: value
                    })
                })
            )
        } else {
            setCommerce((commerce) =>
                ({ ...commerce,
                    [name]: value
                })
            )
        }
    }

    const handleSelect = (files) => {
        setCommerce(prevCommerce => ({
            ...prevCommerce, 
            photos: [...(prevCommerce.photos || []), ...files]
        }));
    };

    useUpdateEffect(() => {
        console.log(commerce)
    }, [commerce])

    const handleOnClick = async () => {
        try {
            console.log(commerce)
            const response = addCommerce(dispatch, commerce);
            show();
            console.log("response:", response);
        } catch (error) {
            console.error("Error updating commerce:", error);
        }
    };
    

    return (
        <div className="container-level2">
            <Header />
            <Toast ref={toast} />
            <div className="content-wrapper">
                <div id="mainContent">
                    <h2>Contenu principal</h2>
                    <p>Ici se trouve le contenu principal de votre page d'édition.</p>
                    <CommerceForm commerce={commerce} setCommerce={setCommerce} 
                    commerces={commerces} onChange={handleChange} onSelect={handleSelect} />
                </div>
                <RightSidebar handleOnClick={handleOnClick} />
            </div>
        </div>
    );
}

export default CommerceNew;
