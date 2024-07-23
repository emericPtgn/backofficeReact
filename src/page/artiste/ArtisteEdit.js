import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtiste, updateArtiste } from "../../service/api";
import Header from "../../component/layout/levelTwo/Header";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import '../../App.css'
import ArtisteForm from "../../component/form/artiste/ArtisteForm";

const ArtisteEdit = () => {
    const { id } = useParams();
    const [ artiste, setArtiste ] = useState( null );

    useEffect(() => {
        const fetchArtiste = async () => {
            try {
                const data = await getArtiste(id);
                setArtiste(data);
            } catch (error) {
                console.log('erreur lors du fetch:', error)
                throw error;
            }
    };
    fetchArtiste();
}, [id]);

    const handleOnClick = async () => {
        try {
            const response = await updateArtiste(id, artiste);
            if(response.ok){
                console.log('update success : artiste mis à jour');
            }
        } catch (error) {
            
        }
    }

if(!artiste){
    return <div>Loading...</div>;
}

    return (
        <>
        <div className="container-level2">
        <Header />
        <div className="content-wrapper">
            <div id="mainContent">
                <h2>Contenu principal</h2>
                <p>Ici se trouve le contenu principal de votre page d'édition.</p>
                <ArtisteForm artiste={artiste} setArtiste={setArtiste}/>
            </div>
            <RightSidebar handleOnClick={handleOnClick} />
        </div>
        </div>
        </>
    )
}

export default ArtisteEdit;