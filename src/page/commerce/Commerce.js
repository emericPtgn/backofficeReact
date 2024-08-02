import React, { useEffect } from "react";
import { CommercesProvider } from "../../context/CommerceContext";
import CommerceTable from "../../component/table/commerce/CommerceTable";
import Header from "../../component/layout/levelTwo/Header";
import { getCommerces } from "../../service/api";
import { useCommercesDispatch } from "../../context/CommerceContext";

export default function CommerceComponent(){
    return (
        <CommercesProvider>
            <Commerce></Commerce>
        </CommercesProvider>
    )
}

const Commerce = () => {
    const dispatch = useCommercesDispatch();

    useEffect(() => {
        // Fonction asynchrone pour obtenir les commerces
        const fetchCommerces = async () => {
            await getCommerces(dispatch);
        };
        
        // Appel de la fonction
        fetchCommerces();
    }, [dispatch]);

    return (
        <div className="container-level2">
            <Header />
            <div className="container-main-content-level2">
                <CommerceTable />
            </div>
        </div>
    );
};

