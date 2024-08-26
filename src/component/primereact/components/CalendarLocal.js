import React from "react";
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';

export default function LocalCalendar({ value, onChange }) {
    const currentDate = new Date();

    addLocale('fr', {
        firstDayOfWeek: 1,
        showMonthAfterYear: true,
        dayNames: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
        dayNamesShort: ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNames: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
        monthNamesShort: ['jan', 'fév', 'mar', 'avr', 'mai', 'jun', 'jul', 'aoû', 'sep', 'oct', 'nov', 'déc'],
        today: 'Aujourd\'hui',
        clear: 'Effacer'
    });


    

    return (
            <Calendar 
                id="calendar-24h" 
                name='date'
                value={value ? new Date(value) : null} 
                onChange={(e) => onChange(e.value, e.target.name)} 
                locale="fr" 
                showTime 
                hourFormat="24" 
                minDate={currentDate}
                placeholder="Date"
            />
    );
}
