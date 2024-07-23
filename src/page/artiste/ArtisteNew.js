import React from "react"
import { useState } from "react";
import Header from "../../component/layout/levelTwo/Header";
import ArtisteForm from "../../component/form/artiste/ArtisteForm";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import { addNewArtiste } from "../../service/api";

const ArtisteNew = () => {
    const [artiste, setArtiste] = useState({
        nom: '',
        style: '',
        description: '',
        reseauxSociaux: [],
      });
    
    
    const handleOnClick = async () => {
        try {
            const response = await addNewArtiste(artiste);
            if(response.ok){
                console.log('update success : artiste mis à jour');
            }
        } catch (error) {
            
        }
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

export default ArtisteNew;