import React from "react";
import '../../.././App.css'

// LeftSidebar levelOne est le menu principal de navigation aligné à gauche de l'écran visible sur ttes les pages du backoffice
const LeftSidebar = () => {
    const onglets = ['Artiste', 'Scene', 'Programmation', 'Activite', 'Commerce', 'Carte', 'Utilisateur'];
    return (
        <div id="container-main-nav-left-sidebar">
            <nav id="main-nav-sidebar">
                <ul>
                    {onglets.map((item, i) => (
                        <Onglet key={i} item={item} />
                    ))}
                </ul>
            </nav>
        </div>
    )
}

const Onglet = ({ item }) => {
    const url = encodeURIComponent(item.toLowerCase());    
    return (
        <li>
            <a href={`/${url}`}>{item}</a>
        </li>
    )
}

export default LeftSidebar;