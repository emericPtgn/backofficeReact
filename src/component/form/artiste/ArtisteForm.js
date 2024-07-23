import React, { useState } from "react";
import SocialMedias from '../social/SocialMedias'

const ArtisteForm = ({ artiste, setArtiste }) => {
    const handleOnChange = (e) => {
      const { value, name } = e.target;
      setArtiste(prevArtiste => ({
        ...prevArtiste,
        [name]: value
      }));
    }
  
    return (
      <>
        <form id="artisteForm">
          <input name="nom" placeholder="name" type='text' value={artiste.nom} onChange={handleOnChange} />
          <input name="style" placeholder="style" type='text' value={artiste.style} onChange={handleOnChange} />
          <input name="description" placeholder="description" type='text' value={artiste.description} onChange={handleOnChange} />
          <input type="hidden" id="artist" name="artist" value={artiste.id} />
          <SocialMedias artiste={artiste} />
        </form>
      </>
    );
  };
  

export default ArtisteForm;
