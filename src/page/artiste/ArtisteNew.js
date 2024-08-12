import React, { useState } from "react";
import Header from "../../component/layout/levelTwo/Header";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import { useArtistesDispatch, ArtistesProvider } from "../../context/ArtisteContext";
import { addNewArtiste } from "../../service/api";
import ArtisteForm2 from "../../component/primereact/artiste/ArtisteForm2";

const SUCCESS_MESSAGE = 'Nouvel artiste a bien été ajouté';

// Composant interne qui utilise le contexte
const ArtisteNew = () => {
    const dispatch = useArtistesDispatch();
    const emptyArtist = {nom: '', styles: '', description: '', reseauxSociaux: [], activities: []};
    const [artist, setArtist] = useState(emptyArtist);

    const handleOnClick = async () => {
        try {
            console.log('TRY ADD artist', artist);
            const newArtist = await addNewArtiste(artist);
            console.log('artist ajouté avec succès', newArtist);
            dispatch({type: 'addNewArtist', payload: newArtist});
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
                    {/* <ArtistForm artist={artist} setArtist={setArtist} /> */}
                    <ArtisteForm2 artist={artist} setArtist={setArtist}></ArtisteForm2>
                </div>
                <RightSidebar handleOnClick={handleOnClick} />
            </div>
        </div>
    );
};

export default ArtisteNew;