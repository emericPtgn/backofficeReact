import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../component/layout/levelTwo/Header";
import { updateArtiste } from "../../service/api";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import '../../App.css';
import { useArtistesDispatch, useArtistesState } from "../../context/ArtisteContext";
import ArtisteEdit2Form from "../../component/primereact/artiste/ArtisteEdit2Form";
import ArtisteForm2 from "../../component/primereact/artiste/ArtisteForm2";

const ArtisteEdit = () => {
    const { id } = useParams();
    const dispatch = useArtistesDispatch();
    const state = useArtistesState();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [artist, setArtist] = useState(null);

    useEffect(() => {
        // Check if the artists list is available and not empty
        if (state.artistes && state.artistes.length > 0) {
            const foundArtist = state.artistes.find(a => a.id === id);
            if (foundArtist) {
                setArtist(foundArtist);
                setIsLoading(false);
            } else {
                setError('Artist not found');
                setIsLoading(false);
            }
        } else {
            // If artists list is empty or not available yet
        }
    }, [state.artistes, id]);


    console.log(artist)

    const handleOnClick = async () => {
        try {
            console.log('Updating artist:', artist);
            const response = await updateArtiste(id, artist, dispatch);
            console.log('Update response:', response);
        } catch (error) {
            console.error('Error updating artist:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container-level2">
            <Header />
            <div className="content-wrapper">
                <div id="mainContent">
                    <h2>Contenu principal</h2>
                    <p>Ici se trouve le contenu principal de votre page d'édition.</p>
                    {artist && <ArtisteForm2 artist={artist} setArtist={setArtist} />}
                </div>
                <RightSidebar handleOnClick={handleOnClick} />
            </div>
        </div>
    );
};

export default ArtisteEdit;
