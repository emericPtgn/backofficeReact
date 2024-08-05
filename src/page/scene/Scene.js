import React, { useEffect } from "react";
import Header from "../../component/layout/levelTwo/Header";
import SceneTable from "../../component/table/scene/SceneTable";
import { useSceneDispatch, useSceneState } from "../../context/SceneContext"


function Scene(){
    const dispatch = useSceneDispatch();
    const state = useSceneState();
    console.log(state.scenes)

    return (
        <div className="container-level2">
            <Header />
            <div className="container-main-content-level2">
                <SceneTable />
            </div>
        </div>
    )
}

export default Scene;