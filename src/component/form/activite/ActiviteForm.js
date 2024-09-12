import React, { useState, useEffect } from 'react';
import { useArtistesState } from '../../../context/ArtisteContext';
import { useSceneState } from '../../../context/SceneContext';
import { format, parseISO } from 'date-fns';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';


const TIMEZONE = 'Europe/Paris';


const ActiviteForm = ({ activity, setActivity }) => {
    const stateArtistes = useArtistesState();
    const [artistes, setArtistes] = useState([]);
    const stateEmplacements = useSceneState();
    const [emplacements, setEmplacements] = useState([]);
    const [localDate, setLocalDate] = useState('');


    useEffect(() => {
        console.log(activity.date);
        const artistesListe = stateArtistes.artistes.map(artiste => ({
            id: artiste.id,
            nom: artiste.nom
        }));
        setArtistes(artistesListe);
    
        const emplacementsListe = stateEmplacements.scenes.map(scene => ({
            id: scene.emplacement.id,
            nom: scene.emplacement.nom
        }));
        setEmplacements(emplacementsListe);

        if (activity?.date) {
            // Convertir la date UTC en heure locale française
            const zonedDate = toZonedTime(parseISO(activity.date), TIMEZONE);
            setLocalDate(format(zonedDate, "yyyy-MM-dd'T'HH:mm"));
        }
        
    }, [stateArtistes.artistes, stateEmplacements.scenes, activity]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        if (name === 'artiste' || name === 'emplacement') {
            const selectedOption = e.target.options[e.target.selectedIndex];
            setActivity(prev => ({
                ...prev,
                [name]: { id: value, nom: selectedOption.text }
            }));
        } else if (name === 'date') {
            // Convertir l'heure locale en UTC avant de sauvegarder
            const localDate = new Date(value);
            const utcDate = new Date(localDate.toISOString()); // Convertir en UTC
            setActivity(prev => ({ ...prev, [name]: utcDate.toISOString() }));
        }  else {
            setActivity(prev => ({ ...prev, [name]: value }));
        }
    }

    // Convertir date au format `datetime-local` si elle existe
    const handleDateChange = (e) => {
        const localDateValue = e.target.value;
        setLocalDate(localDateValue);

        // Convertir la date locale en UTC pour le stockage
        const utcDate = fromZonedTime(localDateValue, TIMEZONE);
        setActivity(prev => ({ ...prev, date: utcDate.toISOString() }));
    };

    

    return (
        <form>
            <label htmlFor='nom'>Titre activité</label>
            <input 
                id="nom" 
                type="text" 
                name="nom" 
                value={activity?.nom || ''} 
                onChange={handleOnChange} 
                placeholder="type activité.." 
            />

            <label htmlFor='type'>Type activité</label>
            <input 
                id="type" 
                type="text" 
                name="type" 
                value={activity?.type || ''} 
                onChange={handleOnChange} 
                placeholder="type d'activité.." 
            />

            <label htmlFor='date'>Date activité</label>
            <input 
                id="date" 
                type="datetime-local" 
                name="date" 
                value={localDate} 
                onChange={handleDateChange} 
            />

            <label htmlFor='artiste'>Artiste activité</label>
            <select 
                id="artiste" 
                name="artiste" 
                onChange={handleOnChange} 
                value={activity?.artiste?.id || ''}
            >
                <option value="">Sélectionner un artiste</option>
                {artistes.map(artiste => (
                    <option key={artiste.id} value={artiste.id}>
                        {artiste.nom}
                    </option>
                ))}
            </select>

            <label htmlFor='emplacement'>Emplacement activité</label>
            <select 
                id='emplacement' 
                name='emplacement' 
                onChange={handleOnChange} 
                value={activity?.emplacement?.id || ''}
            >
                <option value="">Sélectionner un emplacement</option>
                {emplacements.map(emplacement => (
                    <option key={emplacement.id} value={emplacement.id}>
                        {emplacement.nom}
                    </option>
                ))}
            </select>

            <label htmlFor='description'>Description activité</label>
            <input 
                id="description" 
                type="text" 
                name="description" 
                value={activity?.description || ''} 
                onChange={handleOnChange} 
                placeholder="description activité : nouveau concert..."
            />
        </form>
    );
}

export default ActiviteForm;
