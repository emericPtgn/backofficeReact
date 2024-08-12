import React from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import LocalCalendar from "../components/CalendarLocal";
import { SelectTypeActivity } from "../components/SelectTypeActivity";
import SelectLocation from "../components/SelectLocation";

export const ActiviteForm2 = ({ activity, onChange, index }) => {
    if (!activity) {
        return null;
    }

    const handleLocalChange = (field, value) => {
        console.log(field)
        // Convertir les dates en UTC avant de les envoyer
        const dateValue = field === 'date' ? new Date(value).toISOString() : value;
        onChange({ target: { name: `activite_${field}_${index}`, value: dateValue } });
    };

    const handleDeleteField = () => {
        onChange({ target: { name: 'deleteField', value: index } });
    };

    return (
        <Card className="p-4 m-4" index={index}>
            <div className="d-flex justify-content-between">
                <h2 className="text-2xl font-bold mb-4">Ajouter une activité</h2>
                <button className="pi pi-times" onClick={handleDeleteField}>supprimer</button>
            </div>
            <div className="flex flex-column gap-5">
                <SelectTypeActivity name='type' value={activity.type} onChange={(value, name) => handleLocalChange(name, value)} />
                <NameField name='nom' value={activity.nom} onChange={(e) => handleLocalChange(e.target.name, e.target.value)} />
                <LocalCalendar name='date' value={activity.date} onChange={(value, name) => handleLocalChange(name, value)} />
                <SelectLocation name='location' typeActivity={activity.type} value={activity.location} onChange={(value) => handleLocalChange('location', value)} />
            </div>
        </Card>
    );
};

const NameField = ({ value, onChange }) => {
    return (
        <div className="mb-3">
            <InputText
                name="nom"
                value={value}
                onChange={onChange}
                placeholder="Titre Activité"
                className="w-100"
            />
        </div>
    );
};
