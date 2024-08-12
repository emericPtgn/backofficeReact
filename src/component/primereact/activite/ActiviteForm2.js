import React from "react";
import LocalCalendar from "../components/CalendarLocal";
import { SelectTypeActivity } from "../components/SelectTypeActivity";
import SelectLocation from "../components/SelectLocation";
import { NameField } from "../components/NameField";
import { AutoComplet } from "../components/AutoComplet";

export const ActiviteForm2 = ({ activity, onChange, index, activities }) => {

    if (!activity) { return null; }

    const handleLocalChange = (field, value) => {
        const dateValue = field === 'date' ? new Date(value).toISOString() : value;
        onChange({ target: { name: `activite_${field}_${index}`, value: dateValue } });
    };

    const handleDeleteField = () => {
        onChange({ target: { name: 'deleteField', value: index } });
    };

    const artistesNamesArray = activity.artistesNames.split(',');
    const artistesIdsArray = activity.artistesIds.split(',');

    const generateArtistLink = (itemId) => {
        const currentUrl = window.location.origin; // Récupère l'origine de l'URL actuelle (par exemple, https://localhost:3000)
        const pathName = window.location.pathname.split('/').slice(0, -1).join('/'); // Récupère le chemin sans la dernière partie
        return `${currentUrl}${pathName}/${itemId.trim()}`; // Construit l'URL avec l'ID de l'artiste
    };

    const artistLinks = artistesNamesArray.map((itemName, i) => {
        const itemId = artistesIdsArray[i];
        return (
            <a key={itemId.trim()} href={generateArtistLink(itemId)}>
                {itemName.trim()}
            </a>
        );
    });

    return (
        <>
            <div className="mt-5">
                <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center mb-4">
                        <h4 className="text-2xl font-bold mb-0 me-3">Activite {index + 1}</h4>
                        <span className="info_nb_artist">Participants {artistLinks}</span>
                    </div>
                    <button className="pi pi-times" onClick={handleDeleteField}>supprimer</button>
                </div>
                <div className="flex flex-column">
                    <AutoComplet name='autocomplet' activities={activities} onChange={(value, name) => handleLocalChange(name, value)} />
                    <NameField name='nom' value={activity.nom} onChange={(e) => handleLocalChange(e.target.name, e.target.value)} />
                    <SelectTypeActivity name='type' value={activity.type} onChange={(value, name) => handleLocalChange(name, value)} />
                    <LocalCalendar name='date' value={activity.date} onChange={(value, name) => handleLocalChange(name, value)} />
                    <SelectLocation name='location' typeActivity={activity.type} activity={activity} onChange={(value, name) => handleLocalChange(name, value)} />
                </div>
            </div>
        </>
    );
};
