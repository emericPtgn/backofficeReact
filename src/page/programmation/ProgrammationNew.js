import React, { useState } from "react";
import ProgrammationForm from "../../component/form/programmation/ProgrammationForm";
import { addProgrammation } from "../../service/api";
import { useProgrammationDispatch } from "../../context/ProgrammationContext";
import Header from "../../component/layout/levelTwo/Header";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";

const ProgrammationNew = () => {
    const [programmation, setProgrammation] = useState({});
    const dispatch = useProgrammationDispatch();

    const handleOnClick = () => {
        try {

            addProgrammation(programmation, dispatch)
        } catch (error) {
            
        }
    }
    return (
        <>
        <div className="container-level2">
            <Header />
            <div className="content-wrapper">
                <div id="mainContent">
                    <h2>Contenu principal</h2>
                    <p>Ici se trouve le contenu principal de votre page d'édition.</p>
                    <p id="successMessage"></p>
                    <ProgrammationForm  programmation={programmation} setProgrammation={setProgrammation}/>
                </div>
                <RightSidebar handleOnClick={handleOnClick} />
            </div>
        </div>
        </>
    )
}

export default ProgrammationNew;