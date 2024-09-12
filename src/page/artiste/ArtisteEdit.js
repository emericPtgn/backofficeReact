import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { updateArtiste } from "../../service/api";
import { useArtistesDispatch, useArtistesState } from "../../context/ArtisteContext";
import { Toast } from 'primereact/toast';
import Header from "../../component/layout/levelTwo/Header";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import ArtisteForm2 from "../../component/primereact/artiste/ArtisteForm2";
import '../../App.css';
import FindByIdAndSetDocument from "../../utils/findByIdAndSetDocument";
import handleClickToUpdate from "../../utils/handleClickToUpdate";
import { useMemo } from "react";

const ArtisteEdit = () => {
    const { id } = useParams();
    const dispatch = useArtistesDispatch();
    const state = useArtistesState();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState(null);
    const [artist, setArtist] = useState(null);
    const toast = useRef(null);


    const artists = useMemo(() => {
        if (!state) return [];
        return state.artistes;
    }, [state.artistes]);

    FindByIdAndSetDocument( artists, id, setArtist, setStatus, setIsLoading )

    
    const onClickUpdate = async () => {
        try {
            await handleClickToUpdate(id, dispatch, artist, updateArtiste, toast)
        } catch (error) {
            console.error('Error during update', error);
        }
    }


    if (isLoading) {
        return <div>Chargement en cours</div>;
    } else if (!artist){
        return <div>Artist non trouvé</div>;
    }

    return (
        <div className="container-level2">
            <Header />
            <Toast ref={toast} />
            <div className="content-wrapper">
                <div id="mainContent">
                    <div>
                        <h2>Contenu principal</h2>
                        <p>Ici se trouve le contenu principal de votre page d'édition.</p>
                    </div>
                    {artist && <ArtisteForm2 artist={artist} setArtist={setArtist} />}
                </div>
                <RightSidebar handleOnClick={onClickUpdate} />
            </div>
        </div>
    );
};

export default ArtisteEdit;
