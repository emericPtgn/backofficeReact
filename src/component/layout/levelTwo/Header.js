import React from "react";
import '../../../App.css'
const Header = () => {
    // présente la page : titre, fonctions, propriétés et méthodes en quelques mots.
    const pathname = window.location.pathname;
    const pathParts = pathname.split('/');
    const pageTitle = pathParts[1] ? pathParts[1] : 'Accueil';
      // Mettre en majuscule la première lettre de pageTitle
    const capitalizedPageTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);

    return (
        <>
         <div id="container-header-level2">
            <div className="d-flex">
                <h1>{capitalizedPageTitle}</h1>
                <button type="button"> <a href='/artiste-new'>Ajouter un artiste</a> </button>
            </div>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
        </div>
        </>
    )
}

export default Header;