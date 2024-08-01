import React, { useEffect, useState } from "react";

const ActiviteForm = ({ activity, setActivity, artistes }) => {

    const handleOnChange = (e) => {
        const { name, value } = e.target;
    
        if (name === 'date') {
            // La date est au format 'YYYY-MM-DDTHH:mm', donc on peut créer un objet Date
            // qui interprétera la date comme étant en heure locale.
            const localDate = new Date(value);
            
            // Créer une date en UTC à partir de la date locale
            const utcDate = new Date(
                Date.UTC(
                    localDate.getFullYear(),
                    localDate.getMonth(),
                    localDate.getDate(),
                    localDate.getHours(),
                    localDate.getMinutes()
                )
            );
    
            setActivity((prevActivity) => ({
                ...prevActivity,
                date: utcDate.toISOString() // Conserver l'heure en UTC
            }));
        } if (name === 'artiste') {
            console.log('artiste changed : ', name, ':', value);
            setActivity((prevActivity) => ({
                ...prevActivity,
                artiste: { id: value }
            }));
            console.log('select artiste', value);
        } else {
            setActivity((prevActivity) => ({
                ...prevActivity,
                [name]: value
            }));
        }
    };
    
    if (!activity && !artistes) {
        return <div>Loading...</div>;
    }

    // Format the date to yyyy-MM-ddThh:mm
    const formatDate = (date) => {
        if (!date) return '';
        
        // Convertir l'ISO string en objet Date
        const utcDate = new Date(date);
    
        // Convertir l'UTC Date en heure locale de l'utilisateur
        const localDate = new Date(
            utcDate.getUTCFullYear(),
            utcDate.getUTCMonth(),
            utcDate.getUTCDate(),
            utcDate.getUTCHours(),
            utcDate.getUTCMinutes()
        );
    
        // Formater la date locale pour l'affichage dans le formulaire
        const year = localDate.getFullYear();
        const month = String(localDate.getMonth() + 1).padStart(2, '0');
        const day = String(localDate.getDate()).padStart(2, '0');
        const hours = String(localDate.getHours()).padStart(2, '0');
        const minutes = String(localDate.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    
    

    return (
        <>
            <form id="artisteForm">
                <label htmlFor='nom'>Titre activite</label>
                <input id="nom" type="text" name="nom" value={activity?.nom? activity.nom : ''} onChange={handleOnChange} placeholder="type activite : concert, dedicace.." />
                <label htmlFor='type'>Type activite</label>
                <input id="type" type="text" name="type" value={activity?.type? activity.type : ''} onChange={handleOnChange} placeholder="nom artiste : jazaphon, rapetou.." />
                <label htmlFor='date'>Date activite</label>
                <input id="date" type="datetime-local" name="date" value={formatDate(activity?.date? activity.date : '')} onChange={handleOnChange} placeholder="date activite : 12 mars..." />
                <label htmlFor='artiste'>Artiste activite</label>
                <select
                    id="artiste"
                    name="artiste"
                    onChange={handleOnChange}
                    defaultValue={activity?.artiste?.id? activity.artiste.id : ''}
                >
                    <option>Selectionner un artiste</option>
                    {artistes.map(artiste => (
                        <option id="artisteId" key={artiste.id} value={artiste.id}>
                            {artiste.nom}
                        </option>
                    ))}
                </select>
                <label htmlFor='emplacement'>Emplacement activite</label>
                <input
                    id="emplacement"
                    type="text"
                    name="emplacement"
                    value={activity?.emplacement?.nom? activity.emplacement.nom : ''}
                    onChange={handleOnChange}
                    placeholder="emplacement activite : scene A, scene B..."
                />
                <label htmlFor='description'>Description activite</label>
                <input
                    id="description"
                    type="text"
                    name="description"
                    value={activity?.description? activity.description : ''}
                    onChange={handleOnChange}
                    placeholder="description activite : nouveau concert..."
                />
            </form>
        </>
    );
}

export default ActiviteForm;
