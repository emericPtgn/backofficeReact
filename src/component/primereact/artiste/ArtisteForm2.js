import React, { useEffect, useState } from "react";
import { Chips } from "primereact/chips";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from "primereact/inputtextarea";
import { Card } from 'primereact/card';
import { ActiviteForm2 } from "../activite/ActiviteForm2";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";

export default function ArtisteForm2({ artist, setArtist }) {
    const {id} = useParams();
    
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


    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        if (name.startsWith('plateforme_') || name.startsWith('url_')) {
            const [prefix, index] = name.split('_');
            const updatedFields = socialField.map(social => social);
            updatedFields[index][prefix] = value;
            setFields(updatedFields);
            setArtist(prevArtiste => ({
                ...prevArtiste,
                reseauxSociaux: updatedFields.map(f => ({ plateforme: f.plateforme, url: f.url }))
            }));

        } else if (name.startsWith('deleteSocial_')){
            const [prefix, index] = name.split('_');
            const updatedSocialFields = socialField.map(social => social);
            updatedSocialFields.splice(index, 1);
            setFields(updatedSocialFields);
            setArtist((artist) => ({...artist, reseauxSociaux : updatedSocialFields}))
    
        } else if (name.startsWith('activite_')) {
            const [prefix, field, index] = name.split('_');
            const updatedActivities = activityField.map(activity => activity);
            updatedActivities[index][field] = value;
            setActivityFields(updatedActivities);
            setArtist((artist) => ({...artist, activities : activityField}));
    
        } else if (name === 'deleteField') {
            const updatedActivities = activityField.filter(a => a.index !== parseInt(value));
            setActivityFields(updatedActivities);
            setArtist({...artist, activites: updatedActivities.map(a => a.value)});
        }
        else if (name === 'nom' || name === 'description' || name === 'styles') {
            setArtist({ ...artist, [name]: value });
        }

    };


    return (
        <Card className="p-4 m-4">
            <div className="flex flex-column gap-5">
                <div className="mb-4">
                    <div className="d-flex">
                        <h3 className="text-1xs font-bold mb-4">Artiste</h3>
                    </div>
                    <NameField artist={artist} name='nom' onChange={handleChange} />
                    <ChooseStyleInput artist={artist} name='styles' onChange={handleChange} />
                    <DescriptionField artist={artist} name='description' onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <div className="d-flex">
                        <h3 className="text-1xs font-bold mb-4">Réseau social</h3>
                        <div className="mb-2"><Button icon="pi pi-check" aria-label="Filter" rounded onClick={addSocialField}>+</Button></div>
                    </div>
                    <SocialAccountField artist={artist} socialField={socialField} setFields={setFields} addSocialField={addSocialField} onChange={handleChange} />
                </div>
                <div>
                    <div className="d-flex">
                        <h3 className="text-1xs font-bold mb-4">Activité</h3>
                        <div className="mb-2"><Button icon="pi pi-check" aria-label="Filter" rounded onClick={addActivityField}>+</Button></div>
                    </div>
                    {activityField.map((activity, index) => (
                        <div key={index}>
                            <ActiviteForm2 
                                index={index}
                                activity={activity}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}

const NameField = ({ onChange, artist }) => {
    const [value, setValue] = useState(artist.nom || '');

    return (
        <div className="mb-3">
            <InputText
                name="nom"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e);
                }}
                placeholder="Nom de l'artist"
                className="w-100"
            />
        </div>
    );
}

function ChooseStyleInput({ onChange, artist }) {
    const [value, setValue] = useState(artist.styles || ''); // Initialize value as an empty array

    return (
        <div className="card p-fluid mb-3">
            <Chips
                name="styles"
                value={value}
                onChange={(e) => {
                    setValue(e.value);
                    onChange(e);
                }}
                separator=","
                placeholder="Entrez les styles et appuyez sur Entrée"
                style={{ width: '100%', height: '100%', border: 'none' }}
                className="mb-0"
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
        <div id="container-socialAccounts-artist">
            {socialField.map((field, index) => (
                <div key={index}>
                    <InputText
                        name={`plateforme_${index}`}
                        value={field.plateforme}
                        onChange={(e) => {onChange(e)}}
                        placeholder="Facebook, Tiktok..."
                        className="w-50 mb-3"
                    />
                    <InputText
                        name={`url_${index}`}
                        value={field.url}
                        onChange={(e) => {onChange(e)}}
                        placeholder="URL"
                        className="w-50 mb-3"
                    />
                    <button name={`deleteSocial_${index}`} onClick={(e) => {onChange(e)}}>Delete</button>
                </div>
            ))}
        </div>
    );
};