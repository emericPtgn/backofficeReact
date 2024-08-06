import React, { createContext, useState } from "react";
import { SelectButton } from 'primereact/selectbutton';
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import LocalCalendar from "../components/CalendarLocal";
import { SelectTypeActivity } from "../components/SelectTypeActivity";


const options = ['Concert', 'Dedicace', 'Jeux']; // Define
export const ActiviteForm2 = ({ activity, onChange }) => {
    if (!activity) {
        return null;
    }

    const handleLocalChange = (field, value) => {
        onChange({ target: { name: `activite_${field}_${activity.id}`, value } });
    };

    return (
        <Card className="p-4 m-4">
            <h2 className="text-2xl font-bold mb-4">Ajouter une activité</h2>
            <div className="flex flex-column gap-5">
                <SelectTypeActivity value={activity.typeActivity} onChange={(value) => handleLocalChange('typeActivity', value)} />
                <NameField value={activity.nomActivite} onChange={(e) => handleLocalChange('nomActivite', e.target.value)} />
                <LocalCalendar dateTime24h={activity.dateTime} setDateTime24h={(value) => handleLocalChange('dateTime', value)} />
            </div>
        </Card>
    );
};



const NameField = ({ value, onChange }) => {
    return (
        <div className="mb-3">
            <InputText
                name="nomActivite"
                value={value}
                onChange={onChange}
                placeholder="Titre Activité"
                className="w-100"
            />
        </div>
    );
};