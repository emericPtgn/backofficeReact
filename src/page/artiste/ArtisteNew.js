import React, { useState } from "react";
import Header from "../../component/layout/levelTwo/Header";
import ArtisteForm from "../../component/form/artiste/ArtisteForm";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import { useArtistesDispatch, ArtistesProvider } from "../../context/ArtisteContext";
import { addNewArtiste } from "../../service/api";

const SUCCESS_MESSAGE = 'Nouvel artiste a bien été ajouté';

// Composant interne qui utilise le contexte
const ArtisteNew = () => {
    const dispatch = useArtistesDispatch();
    const emptyArtist = {nom: '', style: '', description: '', reseauxSociaux: []};
    const [artiste, setArtiste] = useState(emptyArtist);

    const handleOnClick = async () => {
        try {
            const newArtiste = await addNewArtiste(artiste);
            console.log('artiste ajouté avec succès', newArtiste);
            dispatch({type: 'addNewArtiste', payload: newArtiste});
            document.getElementById('successMessage').innerHTML = SUCCESS_MESSAGE;
 
        } catch (error) {
            console.error('error : ', error);
        }
    };

    return (
        <div className="container-level2">
            <Header />
            <div className="content-wrapper">
                <div id="mainContent">
                    <h2>Contenu principal</h2>
                    <p>Ici se trouve le contenu principal de votre page d'édition.</p>
                    <p id="successMessage"></p>
                    <ArtisteForm artiste={artiste} setArtiste={setArtiste} />
                </div>
                <RightSidebar handleOnClick={handleOnClick} />
            </div>
        </div>
    );
};

export default ArtisteNew;