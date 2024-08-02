import React, { useEffect } from "react";
import Header from "../../component/layout/levelTwo/Header";
import SceneTable from "../../component/table/scene/SceneTable";
import { ActiviteProvider } from "../../context/ActiviteContext";
import { SceneProvider, useSceneDispatch } from "../../context/SceneContext";
import { getScenes } from "../../service/api";

export default function SceneComponent(){
    return (
        <SceneProvider>
            <Scene></Scene>
        </SceneProvider>
    )
}

function Scene(){
    const dispatch = useSceneDispatch();
    useEffect(()=>{
        getScenes(dispatch);
    }, [dispatch])
    return (
        <div className="container-level2">
            <Header />
            <div className="container-main-content-level2">
                <SceneTable />
            </div>
        </div>
    )
}