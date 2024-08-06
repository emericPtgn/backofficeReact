import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';

export default function LocalCalendar({dateTime24h, setDateTime24h}) {
    console.log(dateTime24h)
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
        <div className="card flex justify-content-center">
            <Calendar 
            id="calendar-24h" 
            value={dateTime24h} 
            onChange={(e) => setDateTime24h(e.value)} 
            locale="fr" 
            showTime 
            hourFormat="24" 
            minDate={currentDate}
            />
        </div>
    )
}
