import React from "react";
import Header from "../../component/layout/levelTwo/Header";
import SceneTable from "../../component/table/scene/SceneTable";

const Scene = () => {
    return (
        <>
        <div className="container-level2">
            <Header />
            <div className="container-main-content-level2">
                <SceneTable />
            </div>
        </div>
        </>
    )
}

export default Scene