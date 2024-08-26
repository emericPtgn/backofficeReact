import React, { useEffect, useState } from "react";
import { Chips } from "primereact/chips";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from "primereact/inputtextarea";
import { ActiviteForm2 } from "../activite/ActiviteForm2";
import { useParams } from "react-router-dom";
import { useActiviteState } from "../../../context/ActiviteContext";
import DeleteButton2 from '../../common/button/DeleteButton2'
import AddNewButton from "../../common/button/AddNewButton";
import { Button } from "primereact/button";



export default function ArtisteForm2({ artist, setArtist }) {
    const {id} = useParams();
    const {activities} = useActiviteState();
    const [socialField, setFields] = useState(artist.reseauxSociaux || [{ plateforme: '', url: ''}]);
    const [activityField, setActivityFields] = useState(artist.activities || [{ nom: '', type: '', date: null, location: ''}]);

    const addSocialField = () => {
        const newField = { plateforme: '', url: ''};
        setFields([...socialField, newField]);
    };

    const addActivityField = () => {
        const newField = { 
            nom: '', 
            type: '', 
            date: null,
            location : ''
        };
        setActivityFields([...activityField, newField]);
        console.log(activityField);
    };

    useEffect(()=>{
        setArtist({...artist, activities: activityField, reseauxSociaux : socialField});
    }, [activityField, socialField])


    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("Name:", name, "Value:", value); // Ajoutez cette ligne
    
        if (name.startsWith('plateforme_') || name.startsWith('url_')) {
            const [prefix, index] = name.split('_');
            const updatedFields = socialField.map(social => social);
            updatedFields[index][prefix] = value;
            setFields(updatedFields);
    
        } 
        else if (name.startsWith('deleteSocial_')){
            const [prefix, index] = name.split('_');
            const updatedSocialFields = socialField.map(social => social);
            updatedSocialFields.splice(index, 1);
            setFields(updatedSocialFields);
    
        } else if (name.startsWith('activite_')) {
            const [prefix, field, index] = name.split('_');
                console.log('click')
                const activity = activities.find(activity => activity.nom === value);
                if(activity){
                    const copyActivityField = activityField.map(activity => activity);
                    copyActivityField.splice(index, 1, activity);
                    setActivityFields(copyActivityField);
                } else {
                    console.log(prefix, field, index, name, value)
                    const updatedActivities = activityField.map(activity => activity);
                    updatedActivities[index][field] = value;
                    setActivityFields(updatedActivities);
                }
     }else if (name === 'deleteField') {
        console.log('delete'); // Ce log devrait maintenant apparaître
        const updatedActivities = activityField.map(activity => activity);
        updatedActivities.splice(value, 1);
        setActivityFields(updatedActivities);
    } else if (name === 'nom' || name === 'description' || name === 'styles') {
        setArtist({ ...artist, [name]: value });
    }  
    
    };
    


    return (
        <>
        <div className="form-artist">
            <div>
                <h3 className="text-1xs font-bold">Artiste</h3>
                <div className="form-artist-p1">
                    <div>
                        <NameField  artist={artist} name='nom' onChange={handleChange} />
                        <ChooseStyleInput artist={artist} name='styles' onChange={handleChange} />
                    </div>
                    <DescriptionField artist={artist} name='description' onChange={handleChange} />
                </div>
            </div>
            <div>
                <h3 className="text-1xs font-bold">Réseau social</h3>
                <div className="form-artist-p2">
                    <SocialAccountField artist={artist} socialField={socialField} setFields={setFields} addSocialField={addSocialField} onChange={handleChange} />
                    <div>
                        <AddNewButton rounded icon="pi pi-check" aria-label="Filter" handleOnClick={addSocialField} />
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-1xs font-bold mt-3">Activité</h3>
                <div className="form-artist-p3">
                    <ActivityBloc activities={activities} activityField={activityField} handleChange={handleChange}></ActivityBloc>
                    <div>
                        <AddNewButton rounded icon="pi pi-check" aria-label="Filter" handleOnClick={addActivityField} />
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

const NameField = ({ onChange, artist }) => {
    const [value, setValue] = useState(artist.nom || '');

    return (
        <div className="namefield-artist">
            <InputText
                name="nom"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e);
                }}
                placeholder="Nom de l'artist"
                
            />
        </div>
    );
}

function ChooseStyleInput({ onChange, artist }) {
    const [value, setValue] = useState(artist.styles || ''); // Initialize value as an empty array

    return (
        <div className="styles-artist">
            <Chips
                name="styles"
                value={value}
                onChange={(e) => {
                    setValue(e.value);
                    onChange(e);
                }}
                separator=","
                placeholder="Entrez les styles et appuyez sur Entrée"
                
            />
        </div>
    );
}

const DescriptionField = ({ onChange, artist }) => {
    const [value, setValue] = useState(artist.description || '');

    return (
        <div className="mb-3">
            <InputTextarea
                name="description"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e);
                }}
                rows={5}
                placeholder="Description de l'artist"
                className="w-100"
            />
        </div>
    );
}

const SocialAccountField = ({ socialField, onChange }) => {

    return (
        <>
            {socialField.map((field, index) => (
                <div key={index} className="container-socialAccount-artist">
                    <InputText
                        name={`plateforme_${index}`}
                        value={field.plateforme}
                        onChange={(e) => {onChange(e)}}
                        placeholder="Facebook, Tiktok..."
                    />
                    <InputText
                        name={`url_${index}`}
                        value={field.url}
                        onChange={(e) => {onChange(e)}}
                        placeholder="URL"
                    />
                    <DeleteButton2 
                    name={`deleteSocial_${index}`}  
                    onClick={(e) => {
                        onChange({
                            target: {
                                name: `deleteSocial_${index}`,
                                value: index
                            }
                        });
    }}
/>
                </div>
            ))}
        </>
    );
};

const ActivityBloc = ({ activityField, handleChange, activities }) => {
    return (
        <>
        {activityField.map((activity, index) => (
            <ActiviteForm2 
                key={index}
                index={index}
                activity={activity}
                onChange={handleChange}
                activities={activities}
            />
            ))}
        </>
    )
}