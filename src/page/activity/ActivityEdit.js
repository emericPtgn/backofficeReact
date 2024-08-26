import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateActivity } from "../../service/api";
import { useActiviteState } from "../../context/ActiviteContext";
import { ActiviteForm2 } from "../../component/primereact/activite/ActiviteForm2";
import Header from "../../component/layout/levelTwo/Header";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import '../../App.css'


const ActivityEdit = () => {
    const { id } = useParams();
    const {activities} = useActiviteState()
    const [activity, setActivity] = useState(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
        if(activities && activities.length > 0 ){
            const isActivity = activities.find(activite => activite.id === id);
            if (isActivity) {
                setActivity(isActivity);
                console.log(activity)
            } else {
                setStatus('no activity found with this ID')
            }
        };
    }, [id, activities]);

    const handleOnClick = async () => {
        try {
            console.log(id, activity)
            const response = await updateActivity(id, activity);
            if (response.ok) {
                console.log('update success : activité mise à jour', response);
            }
        } catch (error) {
            console.error('Error updating activity:', error);
        }
    }

    if (!activity) {
        return <div>Loading...</div>;
    }

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
            } else {
                setActivity((prevActivity) => ({
                    ...prevActivity,
                    [field]: value, // Met à jour le champ spécifique de l'activité
                }));
            }
        }
    }

    return (
        <div className="container-level2">
            <Header />
            <div className="content-wrapper">
                <div id="mainContent">
                    <h2>Contenu principal</h2>
                    <p>Ici se trouve le contenu principal de votre page d'édition.</p>
                    {status && <p>{status}</p>}
                    <ActiviteForm2 activities={activities} index={0} activity={activity} setActivity={setActivity} onChange={handleChange}  />
                </div>
                <RightSidebar handleOnClick={handleOnClick} />
            </div>
        </div>
    )
}

export default ActivityEdit;