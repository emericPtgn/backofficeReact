import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../component/layout/levelTwo/Header";
import { updateArtiste } from "../../service/api";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import '../../App.css';
import ArtisteForm from "../../component/form/artiste/ArtisteForm";
import { useArtistesDispatch, useArtistesState } from "../../context/ArtisteContext";

const ArtisteEdit = () => {
    const { id } = useParams();
    const dispatch = useArtistesDispatch();
    const state = useArtistesState();

    const emptyArtist = { nom: '', style: '', description: '', reseauxSociaux: [] };
    const [artiste, setArtiste] = useState(emptyArtist);

    useEffect(() => {
        // Trouver l'artiste spécifique dans la liste des artistes
        if (state.artistes.length > 0) {
            const foundArtiste = state.artistes.find(a => a.id === id);
            if (foundArtiste) {
                setArtiste(foundArtiste);
            }
        }
    }, [state.artistes, id]);

    const handleOnClick = async () => {
        try {
            console.log('update artiste:', artiste);
            const response = await updateArtiste(id, artiste);
            dispatch({ type: 'updateArtiste', payload: artiste });
            console.log(response);
        } catch (error) {
            console.error('error : ', error);
        }
    };

    if (!artiste) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-level2">
            <Header />
            <div className="content-wrapper">
                <div id="mainContent">
                    <h2>Contenu principal</h2>
                    <p>Ici se trouve le contenu principal de votre page d'édition.</p>
                    <ArtisteForm artiste={artiste} setArtiste={setArtiste} />
                </div>
                <RightSidebar handleOnClick={handleOnClick} />
            </div>
        </div>
    );
};

export default ArtisteEdit;
