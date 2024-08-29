import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useActiviteDispatch, useActiviteState } from "../../context/ActiviteContext";
import { ActiviteForm2 } from "../../component/primereact/activite/ActiviteForm2";
import Header from "../../component/layout/levelTwo/Header";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import '../../App.css';
import handleClickToUpdate from "../../utils/handleClickToUpdate";
import { updateActivity } from "../../service/api";
import { Toast } from "primereact/toast";
import { useMemo } from "react";
import FindByIdAndSetDocument from "../../utils/findByIdAndSetDocument";

const ActivityEdit = () => {
    const { id } = useParams();
    const state = useActiviteState()
    const dispatch = useActiviteDispatch();
    const [activity, setActivity] = useState(null);
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const toast = useRef(null);

    const activities = useMemo(() => {
        if (!state?.activities) return [];
        return state?.activities;
    }, [state?.activities]);

    FindByIdAndSetDocument(activities, id, setActivity, setStatus, setIsLoading);

    const handleChange = (e) => {
        const {name, value} = e.target;
        if(name.startsWith('activite_')){
            const [prefix, field, index] = name.split('_');
            console.log(prefix, field, value);
            if(field === 'autocomplet'){
                console.log('tac')
                let findActivity = activities.find(activity => activity.nom === value);
                if(findActivity){
                    setActivity(findActivity)
                } else {
                    console.log('tac')
                    setActivity((prevActivity) => ({...prevActivity, nom : value}));
                }
            } else if (field === 'location'){
                setActivity((prevActivity) => ({...prevActivity, marker : { nom : value}}))
            } 
            else {
                setActivity((prevActivity) => ({
                    ...prevActivity,
                    [field]: value, // Met à jour le champ spécifique de l'activité
                }));
            }
        }
    }

    const onClickUpdate = async () => {
        try {
            await handleClickToUpdate(id, dispatch, activity, updateActivity, toast)
        } catch (error) {
            console.error('Error during update', error);
        }
    }

    if (isLoading) {
        return <div>Chargement en cours</div>;
    } else if (!activity){
        return <div>Activite non trouvé</div>;
    }

    return (
        <div className="container-level2">
            <Header />
            <div className="content-wrapper">
                <div id="mainContent">
                    <Toast ref={toast}/>
                    <h2>Contenu principal</h2>
                    <p>Ici se trouve le contenu principal de votre page d'édition.</p>
                    {status && <p>{status}</p>}
                    <ActiviteForm2 activities={activities} index={0} activity={activity} setActivity={setActivity} onChange={handleChange}  />
                </div>
                <RightSidebar handleOnClick={onClickUpdate} />
            </div>
        </div>
    )
}

export default ActivityEdit;