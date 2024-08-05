import React, { useEffect, useState } from "react";
import { format, parseISO } from 'date-fns';
import { useProgrammationState } from "../../../context/ProgrammationContext";
import { useActiviteState } from "../../../context/ActiviteContext";
import { useParams } from "react-router-dom";

const ProgrammationForm = ({ programmation, setProgrammation }) => {

  const { activities } = useActiviteState();
  const [choosedActivites, setChoosedActivites] = useState(programmation?.activites || []);

  useEffect(() => {
    setChoosedActivites(programmation?.activites || []);
    console.log(activities)
  }, [programmation]);

  const handleOnChange = (e) => {
    const { name, value, selectedOptions } = e.target;
  
    if (name === "dateDebut" || name === "dateFin") {
      setProgrammation(prev => ({
        ...prev,
        [name]: parseISO(value)
      }));
    } else if (name === 'activites') {
      const selectedIds = Array.from(selectedOptions, option => option.value);
      const selectedActivities = selectedIds.map(id => ({ id }));
      setChoosedActivites(selectedActivities);
      setProgrammation(prev => ({
        ...prev,
        activites: selectedActivities
      }));
    } else {
      setProgrammation(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  

  const formatDate = (date) => {
    if (!date) return "";
    return format(new Date(date), "yyyy-MM-dd");
  };

  return (
    <form>
      <label htmlFor="titre">TITRE PROGRAMMATION</label>
      <input
        type="text"
        name="titre"
        id="titre"
        value={programmation?.titre || ""}
        onChange={handleOnChange}
      />

      <label htmlFor="description">DESCRIPTION</label>
      <input
        type="text"
        name="description"
        id="description"
        value={programmation?.description || ""}
        onChange={handleOnChange}
      />

      <label htmlFor="dateDebut">DATE DEBUT</label>
      <input
        type="date"
        name="dateDebut"
        id="dateDebut"
        value={formatDate(programmation?.dateDebut)}
        onChange={handleOnChange}
      />

      <label htmlFor="dateFin">DATE FIN</label>
      <input
        type="date"
        name="dateFin"
        id="dateFin"
        value={formatDate(programmation?.dateFin)}
        onChange={handleOnChange}
      />

      <label htmlFor="activites">ACTIVITÉS</label>
      {activities && (
        <select
  id="activites"
  name="activites"
  value={choosedActivites.map(activite => activite.id)} // Utiliser les IDs des activités choisies
  onChange={handleOnChange}
  multiple
>
  {activities.map((activite) => (
    <option value={activite.id} key={activite.id}>
      {activite.nom}
    </option>
  ))}
</select>

      )}
    </form>
  );
};

export default ProgrammationForm;
