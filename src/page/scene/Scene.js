import React, { useEffect } from "react";
import Header from "../../component/layout/levelTwo/Header";
import SceneTable from "../../component/table/scene/SceneTable";
import { useSceneDispatch, useSceneState } from "../../context/SceneContext"
import ScenesTable from "../../component/primereact/scene/Scene2";
import TableLayout from "../../component/layout/TableLayout";

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