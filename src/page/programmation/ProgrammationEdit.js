import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../component/layout/levelTwo/Header";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import ProgrammationForm from "../../component/form/programmation/ProgrammationForm";
import { updateProgrammation } from "../../service/api";
import { useProgrammationDispatch, useProgrammationState } from "../../context/ProgrammationContext";

const ProgrammationEdit = () => {

    const [programmation, setProgrammation] = useState(null);
    const [error, setError] = useState(null);
    const state = useProgrammationState();
    const dispatch = useProgrammationDispatch();
    const { id } = useParams();

    useEffect(() => {
        const isProgrammation = state.programmations.find(programmation => programmation.id === id);
        if (isProgrammation) {
            setProgrammation(isProgrammation);
            console.log(isProgrammation)
        }
    }, [id, state.programmations]);

    const handleOnClick = async () => {
        try {
            console.log(id, programmation)
            const response = await updateProgrammation(id, programmation, dispatch);
            console.log(response)
        } catch (error) {
            console.error('Erreur:', error);
            setError(error.message);
        }
    }

    return (
        <div className="container-level2">
            <Header />
            <div className="content-wrapper">
                <div id="mainContent">
                    <h2>Édition de programmation</h2>
                    {programmation && (
                        <ProgrammationForm
                            programmation={programmation}
                            setProgrammation={setProgrammation}
                        />
                    )}
                </div>
                <RightSidebar handleOnClick={handleOnClick} />
            </div>
        </div>
    );
};

export default ProgrammationEdit;
