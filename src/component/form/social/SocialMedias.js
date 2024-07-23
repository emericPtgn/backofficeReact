import React from "react";


const SocialMedias = ({ artiste }) => {
    return (
      <>
        <form id="socialForm">
          <h4>Réseaux sociaux</h4>
          {artiste.reseauxSociaux && artiste.reseauxSociaux.map((social, index) => (
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
        <input name={`plateforme-${index}`} placeholder="tiktok, youtube, instagram..." value={social.plateforme || ''} />
        <input name={`url-${index}`} placeholder="https://www.tiktok.com/example" value={social.url || ''} />
      </div>
    </div>
  );
};

export default SocialMedias;
