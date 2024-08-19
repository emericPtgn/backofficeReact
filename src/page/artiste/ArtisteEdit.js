import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { updateArtiste } from "../../service/api";
import { useArtistesDispatch, useArtistesState } from "../../context/ArtisteContext";
import { Toast } from 'primereact/toast';
import Header from "../../component/layout/levelTwo/Header";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import ArtisteForm2 from "../../component/primereact/artiste/ArtisteForm2";
import '../../App.css';
        

const ArtisteEdit = () => {
    const { id } = useParams();
    const dispatch = useArtistesDispatch();
    const state = useArtistesState();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [artist, setArtist] = useState(null);
    const toast = useRef(null);

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

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Update', detail: 'Artiste mis à jour' });
    };

    const handleOnClick = async () => {
        try {
            show()
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
            <Toast ref={toast} />
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
