import React, {useRef} from "react";
import MyMap from "./Map";
import Header from "../../component/layout/levelTwo/Header";
import { Toast } from "primereact/toast";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";

export default function MapEdit(){
    const toast = useRef(null);
    const handleOnClick = () => {
        return ''
    }
    const handleClick = () => {
        return '';
    }
    return (
        <div className="container-level2">
            <Header />
            <Toast ref={toast} />
            <div className="content-wrapper">
                <div id="mainContent">
                    <div>
                        <h2>Contenu principal</h2>
                        <p>Ici se trouve le contenu principal de votre page d'édition.</p>
                    </div>
                    <MyMap handleClick={handleClick} />
                </div>
                <RightSidebar handleOnClick={handleOnClick} />
            </div>
        </div>
    )
};