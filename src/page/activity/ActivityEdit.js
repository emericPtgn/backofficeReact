import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActivity, getArtistes, updateActivity } from "../../service/api";
import Header from "../../component/layout/levelTwo/Header";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import '../../App.css'
import ActiviteForm from "../../component/form/activite/ActiviteForm";

const ActivityEdit = () => {
    const { id } = useParams();
    const [activity, setActivity] = useState(null);
    const [artistes, setArtistes] = useState([''])

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const data = await getActivity(id);
                setActivity(data);
                console.log(data)
            } catch (error) {
                console.log('erreur lors du fetch:', error)
                throw error;
            }
    };
        const fetchArtistes = async () => {
            try {
                const data = await getArtistes();
                setArtistes(data);
                console.log(data)
            } catch (error) {
                console.log('erreur lors du fetch:', error)
                throw error;
            }
        }
    fetchActivity();
    fetchArtistes();
}, [id]);

    const handleOnClick = async () => {
        try {
            const response = await updateActivity(id, activity);
            console.log('EVENT CLICK', activity);
            if(response.ok){
                console.log('update success : artiste mis à jour', response);
            }
        } catch (error) {
            
        }
    }

if(!activity){
    return <div>Loading...</div>;
}

    return (
        <>
        <div className="container-level2">
        <Header />
        <div className="content-wrapper">
            <div id="mainContent">
                <h2>Contenu principal</h2>
                <p>Ici se trouve le contenu principal de votre page d'édition.</p>
                <ActiviteForm activity={activity} artistes={artistes} setActivity={setActivity}/>
            </div>
            <RightSidebar handleOnClick={handleOnClick} />
        </div>
        </div>
        </>
    )
}

export default ActivityEdit;