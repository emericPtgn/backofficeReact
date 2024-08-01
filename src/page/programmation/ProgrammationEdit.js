import React from "react";
import { useState, useEffect} from "react";
import Header from "../../component/layout/levelTwo/Header";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import ProgrammationForm from "../../component/form/programmation/ProgrammationForm";
import { getActivities, getArtistes, getProgrammation, updateProgrammation } from "../../service/api";
import { useParams } from "react-router-dom";

const ProgrammationEdit = () => {
    const [programmation, setProgrammation] = useState(null); // Utiliser null pour l'état initial
    const [artistes, setArtistes] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Utiliser true pour l'état de chargement initial
    const { id } = useParams();

    useEffect(() => {
        const fetchProgrammation = async () => {
            try {
                const programmationDatas = await getProgrammation(id);
                console.log('fetched programmation ', programmationDatas)
                setProgrammation(programmationDatas);
            } catch (error) {
                console.error("Erreur lors de la récupération de la programmation :", error);
            } finally {
                setIsLoading(false); // Fin du chargement
            }
        };
        const fetchArtistes = async () => {
            try {
                const artistesDatas = await getArtistes();
                console.log('fetched artistes :', artistesDatas)
                setArtistes(artistesDatas);
            } catch (error) {
                console.error("Erreur lors de la récupération des activites :", error);
            } finally {
                setIsLoading(false); // Fin du chargement
            }
        };

        fetchProgrammation();
        fetchArtistes();
    }, [id]);

    const handleOnClick = async () => {
        try {
            console.log(programmation);
            const response = await updateProgrammation(id, programmation);
            if(response.ok){
                console.log('response OK');
            }
        } catch (error) {
            console.error('oups error:', error);
        }

    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!programmation) {
        return <div>Programmation not found</div>;
    }

    return (
        <div className="container-level2">
            <Header />
            <div className="content-wrapper">
                <div id="mainContent">
                    <h2>Contenu principal</h2>
                    <p>Ici se trouve le contenu principal de votre page d'édition.</p>
                    <ProgrammationForm programmation={programmation} artistes={artistes} setProgrammation={setProgrammation}/>
                </div>
                <RightSidebar handleOnClick={handleOnClick} />
            </div>
        </div>
    );
};

export default ProgrammationEdit;
