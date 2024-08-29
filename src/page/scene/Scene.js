import React from "react";
import Header from "../../component/layout/levelTwo/Header";
import ScenesTable from "../../component/primereact/scene/Scene2";


function Scene(){

    return (
        <div className="container-level2">
            <Header />
            <div className="container-main-content-level2">
                <ScenesTable />
            </div>
        </div>
    )
}

export default Scene;