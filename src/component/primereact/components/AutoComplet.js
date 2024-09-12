import React, { useState, useEffect } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { useActiviteState } from "../../../context/ActiviteContext";

export const AutoComplet = ({value, onChange, activities}) => {
    
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (activities && activities.length > 0) {
            setItems(activities.map(activity => activity.nom));
        }
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
                value={value || ''} 
                name="nom"
                suggestions={items || []} 
                completeMethod={search} 
                onChange={(e) => {
                    onChange(e.value, "nom")
                }}
                placeholder="Nom activité .."
                dropdown
            />

    )
}