import React, { useState, useEffect } from "react";
import AddNewButton from "../../common/button/AddNewButton";

const SocialsForm = ({ artiste }) => {
  const [socialAccounts, setSocialAccounts] = useState([]);

  useEffect(()=>{
    if(Array.isArray(artiste.reseauxSociaux)){
      setSocialAccounts(artiste.reseauxSociaux)
    }},
  [artiste.reseauxSociaux]);

  const handleOnClick = () => {
    setSocialAccounts([...socialAccounts, { plateforme: '', url: '' }]);
  };

  return (
    <>
      <form id="socialForm">
        <div className="d-flex">
          <h4>Réseaux sociaux</h4>
          <AddNewButton handleOnClick={handleOnClick} />
        </div>
        {socialAccounts.map((social, index) => (
          <Account key={index} social={social} index={index} />
        ))}
      </form>
    </>
  );
};

const Account = ({ social, index }) => {
  return (
    <div className="social-account">
      <div>
        <input name={`plateforme-${index}`} placeholder="tiktok, youtube, instagram..." defaultValue={social.plateforme || ''} />
        <input name={`url-${index}`} placeholder="https://www.tiktok.com/example" defaultValue={social.url || ''} />
      </div>
    </div>
  );
};

export default SocialsForm;