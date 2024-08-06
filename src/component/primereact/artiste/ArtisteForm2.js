import React, { useState } from "react";
import { Chips } from "primereact/chips";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from "primereact/inputtextarea";
import { Card } from 'primereact/card';
import { ActiviteForm2 } from "../activite/ActiviteForm2";
import { Button } from "primereact/button";

export default function ArtisteForm2({ artiste, setArtiste }) {
    const [socialField, setFields] = useState([{ id: 1, value: '' }]);
    const [activityField, setActivityFields] = useState([
        { id: 1, nomActivite: '', typeActivity: '', dateTime: null }
    ]);
    const [activity, setActivities] = useState([{}])

    const addSocialField = () => {
        const newField = { id: socialField.length + 1, value: '' };
        setFields([...socialField, newField]);
    };

    const addActivityField = () => {
        const newField = { 
            id: activityField.length + 1, 
            nomActivite: '', 
            typeActivity: '', 
            dateTime: null 
        };
        setActivityFields([...activityField, newField]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        if (name === 'style') {
            // Vérifiez si value est un tableau, sinon traitez-le comme une chaîne
            const styleArray = Array.isArray(value) ? value : value.split(',');
            setArtiste({ ...artiste, style: styleArray });
        } else if (name === 'social') {
            const updatedFields = socialField.map(f =>
                f.id === parseInt(e.target.dataset.id) ? { ...f, value } : f
            );
            setFields(updatedFields);
            setArtiste({ ...artiste, reseauxSociaux: updatedFields.map(f => f.value) });
        } else if (name.startsWith('activite_')) {
            const [prefix, field, id] = name.split('_');
            const updatedActivities = activityField.map(activity =>
                activity.id === parseInt(id) ? { ...activity, [field]: value } : activity
            );
            setActivityFields(updatedActivities);
            setArtiste({ ...artiste, activites: updatedActivities });
            console.log(updatedActivities)
        } else if (name === 'typeActivity') {
            // Update the typeActivity property of the activity object
            const updatedActivites = activityField.map(a => a.id === activity.id ? { ...a, typeActivity: value } : a);
            setActivityFields(updatedActivites);
            
        } else {
            setArtiste({ ...artiste, [name]: value });
        }
        console.log(artiste)
    };

    return (
        <Card className="p-4 m-4">
            <div className="flex flex-column gap-5">
                <div className="mb-4">
                    <div className="d-flex">
                        <h3 className="text-1xs font-bold mb-4">Artiste</h3>
                    </div>
                    <NameField onChange={handleChange} />
                    <ChooseStyleInput onChange={handleChange} />
                    <DescriptionField onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <div className="d-flex">
                        <h3 className="text-1xs font-bold mb-4">Réseau social</h3>
                        <div className="mb-2"><Button icon="pi pi-check" aria-label="Filter" rounded onClick={addSocialField}>+</Button></div>
                    </div>
                    <SocialAccountField socialField={socialField} setFields={setFields} addSocialField={addSocialField} onChange={handleChange} setArtiste={setArtiste} artiste={artiste} />
                </div>
                <div>
                    <div className="d-flex">
                        <h3 className="text-1xs font-bold mb-4">Activité</h3>
                        <div className="mb-2"><Button icon="pi pi-check" aria-label="Filter" rounded onClick={addActivityField}>+</Button></div>
                    </div>
                    {activityField.map(activity => (
                        <div key={activity.id}>
                            <ActiviteForm2 
                                activity={activity}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                    <ActiviteForm2 artiste={artiste} setArtiste={setArtiste}/>
                </div>
            </div>
        </Card>
    );
}

function ChooseStyleInput({ onChange }) {
    const [value, setValue] = useState([]); // Initialize value as an empty array

    return (
        <div className="card p-fluid mb-3">
            <Chips
                name="style"
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

const NameField = ({ onChange }) => {
    const [value, setValue] = useState('');

    return (
        <div className="mb-3">
            <InputText
                name="nom"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e);
                }}
                placeholder="Nom de l'artiste"
                className="w-100"
            />
        </div>
    );
}

const DescriptionField = ({ onChange }) => {
    const [value, setValue] = useState('');

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
                placeholder="Description de l'artiste"
                className="w-100"
            />
        </div>
    );
}

const SocialAccountField = ({ socialField, setFields, addSocialField, onChange, setArtiste, artiste }) => {
    const deleteField = (id) => {
        const updatedFields = socialField.filter(field => field.id !== id);
        setFields(updatedFields);
        setArtiste({ ...artiste, reseauxSociaux: updatedFields.map(f => f.value) });
    };

    return (
        <div id="container-socialAccounts-artist">
            {socialField.map(field => (
                <div key={field.id}>
                    <InputText
                        name="social"
                        data-id={field.id}
                        value={field.value}
                        onChange={(e) => {
                            const updatedFields = socialField.map(f =>
                                f.id === field.id ? { ...f, value: e.target.value } : f
                            );
                            setFields(updatedFields);
                            onChange(e);
                        }}
                        placeholder="Compte social"
                        className="w-50 mb-3"
                    />
                    <button onClick={() => deleteField(field.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

