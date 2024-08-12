import React, { useState, useEffect } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { useActiviteState } from "../../../context/ActiviteContext";

export const AutoComplet = ({onChange, activities}) => {
    
    const [items, setItems] = useState([]);
    const [value, setValue] = useState('');

    useEffect(() => {
        // Initialiser les items avec toutes les activités au chargement du composant
        setItems(activities.map(activity => activity.nom));
    }, [activities]);

    const search = (e) => {
        let filteredItems;
        if(!e.query.trim().length){
            filteredItems = [...activities.map(activity => activity.nom)]
        } else {
            filteredItems = activities
            .map(activity => activity.nom)
            .filter(item => item.toLowerCase().includes(e.query.toLowerCase()));
        }
        setItems(filteredItems);
    }
    return (
        <AutoComplete 
            className="mb-4"
            value={value} 
            name="autocomplet"
            suggestions={items} 
            completeMethod={search} 
            onChange={(e) => {
                setValue(e.value);
                onChange(e.value, "autocomplet")
            }}
            dropdown
        />
    )
}