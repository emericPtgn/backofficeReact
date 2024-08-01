import React from "react";

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
};

const formatDateTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:mm'
};

const ProgrammationForm = ({ programmation, setProgrammation, artistes }) => {
  const handleOnChange = (e, activiteIndex) => {
    const { name, value } = e.target;
    
    setProgrammation((prevProgrammation) => {
      if (activiteIndex !== undefined) {
        // Mise à jour d'une activité
        const newActivites = [...prevProgrammation.activites];
        if (name === "artiste") {
          // Mise à jour spécifique pour l'artiste
          const selectedArtiste = artistes.find(a => a.nom === value);
          newActivites[activiteIndex] = {
            ...newActivites[activiteIndex],
            artiste: selectedArtiste
          };
        } else {
          // Mise à jour des autres propriétés de l'activité
          newActivites[activiteIndex] = {
            ...newActivites[activiteIndex],
            [name]: value
          };
        }
        return {
          ...prevProgrammation,
          activites: newActivites
        };
      } else {
        // Mise à jour des champs principaux de la programmation
        return {
          ...prevProgrammation,
          [name]: value
        };
      }
    });
  };

  return (
    <form>
      <label htmlFor="titre">TITRE PROGRAMMATION</label>
      <input 
        type="text" 
        name="titre" 
        id="titre" 
        value={programmation.titre || ""} 
        onChange={handleOnChange} 
      />

      <label htmlFor="description">DESCRIPTION</label>
      <input 
        type="text" 
        name="description" 
        id="description" 
        value={programmation.description || ""} 
        onChange={handleOnChange}
      />

      <label htmlFor="dateDebut">DATE DEBUT</label>
      <input 
        type="date" 
        name="dateDebut" 
        id="dateDebut" 
        value={formatDate(programmation.dateDebut) || ""} 
        onChange={handleOnChange}
      />

      <label htmlFor="dateFin">DATE FIN</label>
      <input 
        type="date" 
        name="dateFin" 
        id="dateFin" 
        value={formatDate(programmation.dateFin) || ""} 
        onChange={handleOnChange}
      />

      {programmation.activites.map((activite, index) => (
        <ActiviteForm 
          key={index} 
          activite={activite} 
          artistes={artistes} 
          handleOnChange={(e) => handleOnChange(e, index)} 
        />
      ))}
    </form>
  );
};

const ActiviteForm = ({ activite, artistes, handleOnChange }) => {
  if (!activite || !artistes) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <label htmlFor='nom'>Titre activite</label>
      <input 
        id="nom" 
        type="text" 
        name="nom" 
        value={activite.nom || ''} 
        onChange={handleOnChange} 
        placeholder="type activite : concert, dedicace.." 
      />

      <label htmlFor='type'>Type activite</label>
      <input 
        id="type" 
        type="text" 
        name="type" 
        value={activite.type || ''} 
        onChange={handleOnChange} 
        placeholder="nom artiste : jazaphon, rapetou.." 
      />

      <label htmlFor='date'>Date activite</label>
      <input 
        id="date" 
        type="datetime-local" 
        name="date" 
        value={formatDateTime(activite.date || '')} 
        onChange={handleOnChange} 
        placeholder="date activite : 12 mars..." 
      />

      <label htmlFor='artiste'>Artiste activite</label>
      <select 
        id="artiste" 
        name="artiste" 
        onChange={handleOnChange}
        value={activite.artiste?.nom || ''}
      >
        <option value="">Sélectionner un artiste</option>
        {artistes.map(artiste => (
          <option key={artiste.id} value={artiste.nom}>
            {artiste.nom}
          </option>
        ))}
      </select>

      <label htmlFor='emplacement'>Emplacement activite</label>
      <input 
        id="emplacement" 
        type="text" 
        name="emplacement" 
        value={activite.emplacement?.nom || ''} 
        onChange={handleOnChange} 
        placeholder="emplacement activite : scene A, scene B..." 
      />

      <label htmlFor='description'>Description activite</label>
      <input 
        id="description" 
        type="text" 
        name="description" 
        value={activite.description || ''} 
        onChange={handleOnChange} 
        placeholder="description activite : nouveau concert..." 
      />
    </div>
  );
}

export default ProgrammationForm;