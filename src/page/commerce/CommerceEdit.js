import React, { useEffect, useState } from "react";
import Header from '../../component/layout/levelTwo/Header.js';
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import { getCommerce, getTypeCommerces, getTypesProduits } from "../../service/api.js";
import CommerceForm from "../../component/form/commerce/CommerceForm.js";
import { useParams } from "react-router-dom";

const CommerceEdit = () => {
    const { id } = useParams();
    const [ commerce, setCommerce ] = useState(null);
    const  [ isLoading, setIsLoading ] = useState(true);

    useEffect(()=>{
        const fetchCommerce = async () => {
            try {
                const commerceDatas = await getCommerce(id);
                console.log('fetched commerce datas : ', commerceDatas);
                setCommerce(commerceDatas);
                setIsLoading(false);
            } catch (error) {
                console.error('something went wrong : ', error);
                throw error;
            }
        }
        fetchCommerce();
    }, [id])

    function handleOnClick(){
        return ('');
    }
    if(isLoading){
        return <div>Chargement en cours</div>
    }
    return (
        <>
        <div className="container-level2">
            <Header />
            <div className="content-wrapper">
                <div id="mainContent">
                    <h2>Contenu principal</h2>
                    <p>Ici se trouve le contenu principal de votre page d'édition.</p>
                    <CommerceForm commerce={commerce} setCommerce={setCommerce} />
                </div>
                <RightSidebar handleOnClick={handleOnClick} />
            </div>
        </div>
        </>
    )
}

export default CommerceEdit;