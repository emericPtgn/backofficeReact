import React, { useEffect } from "react";
import ArtisteTable from "../../component/table/artiste/ArtisteTable";
import Header from "../../component/layout/levelTwo/Header";
import { ArtistesProvider, useArtistesDispatch } from "../../context/ArtisteContext";
import { getArtiste, getArtistes } from "../../service/api";


export default function ArtisteComponent(){
    return (
        <ArtistesProvider>
            <Artiste></Artiste>
        </ArtistesProvider>
    )
} 

const Artiste = () => {
    const dispatch = useArtistesDispatch();
    useEffect(()=>{
        getArtistes(dispatch);
    }, [dispatch])
    return (
        <>
        <div className="container-level2">
        <Header />
        <div className="container-main-content-level2">
            <ArtisteTable />
        </div>
        </div>
        </>
    )
}