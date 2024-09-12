import React from "react";
import Header from "../../component/layout/levelTwo/Header";
import ArtistsTable from "../../component/primereact/artiste/ArtisteTable";

const Artiste = () => {

    return (
        <>
        <div className="container-level2">
        <Header />
        <div className="container-main-content-level2">
            <ArtistsTable />
        </div>
        </div>
        </>
    )
}

export default Artiste;