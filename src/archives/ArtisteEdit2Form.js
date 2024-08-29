import React, { useEffect, useState } from "react";
import { Chips } from "primereact/chips";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from "primereact/inputtextarea";
import { Card } from 'primereact/card';
import { ActiviteForm2 } from "../activite/ActiviteForm2";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";

export default function ArtisteEdit2Form ({artist, setArtist}){

    const [activityField, setActivityFields] = useState([
        { nom: '', type: '', date: null, location: ''}]);

    const [socialField, setSocialFields] = useState(
        [{ plateforme: '', url: ''}]);

    const addSocialField = () => {
        const newSocialField = { plateforme: '', url: ''};
        const socials = artist.reseauxSociaux.map(social => social);
        socials.push(newSocialField);
        setArtist((artist) => ({...artist, reseauxSociaux : socials}))
    }

    const addActivityField = () => {
        console.log('click');
        const newField = {nom: '', type: '', date: null, location: ''};
        const copyActivities = artist.activities.map(activity => activity);
        copyActivities.push(newField);
        setArtist((artist) => ({...artist, activities : copyActivities}))
    };

    const deleteField = (index) => {
        const copySocials = artist.reseauxSociaux;
        copySocials.splice(index, 1);
        setArtist((artist) => ({ ...artist, reseauxSociaux: copySocials }));
      };

    const handleChange = (e) => {
        const {name, value} = e.target;
        if(name === 'styles'){
            setArtist((artist) => ({...artist, styles:value}));
        } else if (name === 'description'){
            setArtist((artist) => ({...artist, description: value}));
        } else if (name.startsWith(`plateforme_`) || name.startsWith(`url_`)) {
            const [prefix, index] = name.split('_');
            const copySocials = artist.reseauxSociaux.map(social => social);
            copySocials[index][prefix] = value; 
            setArtist((artist) => ({...artist, reseauxSociaux: copySocials}));

        } else if (name.startsWith(`activite_`)){
            const [prefix, field, index] = name.split('_');
            console.log(prefix, field, index, value)
            const copyActivities = artist.activities.map(activity => activity);
            copyActivities[index][field] = value;
            setArtist((artist) => ({...artist, activities : copyActivities}));
        }
    }

    return (
        <Card className="p-4 m-4">
            <div className="flex flex-column gap-5">
                <div className="mb-4">
                    <div className="d-flex">
                        <h3 className="text-1xs font-bold mb-4">Artiste</h3>
                    </div>
                    <NameField artist={artist} setArtist={setArtist} onChange={handleChange} />
                    <ChooseStyleInput artist={artist} onChange={handleChange} />
                    <DescriptionField artist={artist} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <div className="d-flex">
                        <h3 className="text-1xs font-bold mb-4">Réseau social</h3>
                        <div className="mb-2"><Button icon="pi pi-check" aria-label="Filter" rounded onClick={addSocialField}>+</Button></div>
                    </div>
                    <SocialAccountField addSocialField={addSocialField} onChange={handleChange} artist={artist} deleteField={deleteField} />
                </div>
                <div>
                    <div className="d-flex">
                        <h3 className="text-1xs font-bold mb-4">Activité</h3>
                        <div className="mb-2"><Button icon="pi pi-check" aria-label="Filter" rounded onClick={addActivityField}>+</Button></div>
                    </div>
                    {artist.activities?.map((activity, index) => (
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
    const [value, setValue] = useState(artist.nom);

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
                tooltip="Nom"
            />
        </div>
    );
}

function ChooseStyleInput({ onChange, artist }) {
    const [value, setValue] = useState(artist.styles); // Initialize value as an empty array

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
    const [value, setValue] = useState(artist.description);

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

const SocialAccountField = ({ onChange, artist, deleteField }) => {
    return (
        <>
            {artist.reseauxSociaux.map((field, index) => (
                <Account index={index} key={index} field={field} onChange={onChange} deleteField={deleteField} id="container-socialAccounts-artist"></Account>
            ))}
        </>
    );
};

const Account = ({index, field, onChange, deleteField}) => {
    return (
        <>
        <div>
            <InputText  name={`plateforme_${index}`} value={field.plateforme} 
            onChange={(e) => {onChange(e)}} placeholder="Facebook, Tiktok..." className="w-50 mb-3"/>
            <InputText name={`url_${index}`} value={field.url} onChange={(e) => {onChange(e)}}
            placeholder="URL" className="w-50 mb-3"/>
            <button onClick={() => deleteField(index)}>Delete</button>
        </div>
        </>
    )
}