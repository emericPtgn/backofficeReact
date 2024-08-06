import React, { useEffect } from "react";
// import ArtisteTable from "../../component/table/artiste/ArtisteTable";
import Header from "../../component/layout/levelTwo/Header";
import { ArtistesProvider, useArtistesDispatch, useArtistesState} from "../../context/ArtisteContext";
import { getArtistes } from "../../service/api";
import CheckboxRowSelectionDemo from "../../component/primereact/artiste/ArtisteTable";

const Artiste = () => {
    const dispatch = useArtistesDispatch();
    const state = useArtistesState();
    console.log(state.artistes)
    useEffect(()=>{
        getArtistes(dispatch);
    }, [dispatch])
    return (
        <>
        <div className="container-level2">
        <Header />
        <div className="container-main-content-level2">
            <CheckboxRowSelectionDemo />
        </div>
        </div>
        </>
    )
}

export default Artiste;