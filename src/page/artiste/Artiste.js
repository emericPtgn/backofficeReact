import React from "react";
import ArtisteTable from "../../component/table/artiste/ArtisteTable";
import Header from "../../component/layout/levelTwo/Header";

const Artiste = () => {
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

export default Artiste;