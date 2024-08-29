import React from "react";
import SocialForm from "../social/SocialForm";

const ArtisteForm = ({artiste, setArtiste}) => {
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setArtiste(prev => ({ ...prev, [name]: value }));
    };

    const addSocialMedia = () => {
      setArtiste(prev => ({
          ...prev,
          reseauxSociaux: [...prev.reseauxSociaux, { plateforme: '', url: '' }]
      }));
  };
  
  const updateSocialMedia = (index, field, value) => {
    console.log(field, value)
      setArtiste(prev => {
          const newReseauxSociaux = [...prev.reseauxSociaux];
          newReseauxSociaux[index] = { ...newReseauxSociaux[index], [field]: value };
          return { ...prev, reseauxSociaux: newReseauxSociaux };
      });
  };
  
  const removeSocialMedia = (index) => {
      setArtiste(prev => ({
          ...prev,
          reseauxSociaux: prev.reseauxSociaux.filter((_, i) => i !== index)
      }));
  };


    return (
        <form >
            <input
                name="nom"
                value={artiste.nom}
                onChange={handleChange}
                placeholder="Nom de l'artiste"
            />
            <input
                name="style"
                value={artiste.style}
                onChange={handleChange}
                placeholder="Style musical"
            />
            <textarea
                name="description"
                value={artiste.description}
                onChange={handleChange}
                placeholder="Description"
            />
            
            <h3>Réseaux sociaux</h3>
            {!artiste.reseauxSociaux ? <div>no artiste found</div> : 
            artiste.reseauxSociaux.map((social, index) => (
              <SocialForm
                  key={index}
                  social={social}
                  onChange={(field, value) => updateSocialMedia(index, field, value)}
                  onRemove={() => removeSocialMedia(index)}
              />
          ))
            }
            
            <button type="button" onClick={addSocialMedia}>Ajouter un réseau social</button>
            
        </form>
    );
};

export default ArtisteForm;