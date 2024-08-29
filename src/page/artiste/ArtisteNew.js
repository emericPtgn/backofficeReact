import React, { useState, useRef } from "react";
import Header from "../../component/layout/levelTwo/Header";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import { useArtistesDispatch, ArtistesProvider } from "../../context/ArtisteContext";
import { addNewArtiste } from "../../service/api";
import ArtisteForm2 from "../../component/primereact/artiste/ArtisteForm2";
import { Toast } from "primereact/toast";
import handleClicktoAdd from "../../utils/handleClickToAdd";


// Composant interne qui utilise le contexte
const ArtisteNew = () => {
    const dispatch = useArtistesDispatch();
    const emptyArtist = {nom: '', styles: '', description: '', reseauxSociaux: [], activities: []};
    const [artist, setArtist] = useState(emptyArtist);
    const toast = useRef(null);


    const onClickUpdate = async () => {
        try {
            await handleClicktoAdd( dispatch, artist, addNewArtiste, toast )
        } catch (error) {
            console.error('Error during update', error);
        }
    }

    return (
        <div className="container-level2">
            <Header />
            <div className="content-wrapper">
                <div id="mainContent">
                    <h2>Contenu principal</h2>
                    <p>Ici se trouve le contenu principal de votre page d'édition.</p>
                    <p id="successMessage"></p>
                    <Toast ref={toast}/>
                    <ArtisteForm2 artist={artist} setArtist={setArtist}></ArtisteForm2>
                </div>
                <RightSidebar handleOnClick={onClickUpdate} />
            </div>
        </div>
    );
};

export default ArtisteNew;