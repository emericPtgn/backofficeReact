import React from "react";
import { useState } from "react";
import SceneForm from "../../component/form/scene/SceneForm";
import Header from "../../component/layout/levelTwo/Header";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import { useSceneDispatch, useSceneState } from "../../context/SceneContext";
import Scene from "./Scene";
import { addScene } from "../../service/api";

const SUCCES_MESSAGE = 'new scene registered successfully';
const ERROR_MESSAGE = 'something occured while registering new scene, try again';

const SceneNew = () => {
    const state = useSceneState();
    const dispatch = useSceneDispatch();
    const [scene, setScene] = useState({
        nom: '',
        emplacement: {
            nom: '',
            latitude: '',
            longitude: ''
        }
    });

    const handleOnClick = () => {
        try {
            addScene(scene, dispatch);
            console.log('handleClick, try ... addScene(scene,dispatch)', scene)
        } catch (error) {
            console.error('error occured: ', error);
        }
    }
    let successMessage = document.getElementById('successMessage');

    return (
        <>
        <div className="container-level2">
            <Header />
            <div className="content-wrapper">
                <div id="mainContent">
                    <h2>Contenu principal</h2>
                    <p>Ici se trouve le contenu principal de votre page d'édition.</p>
                    <p id="successMessage"></p>
                    <SceneForm  scene={scene} setScene={setScene}/>
                </div>
                <RightSidebar handleOnClick={handleOnClick} />
            </div>
        </div>
        </>
    )
}

export default SceneNew;