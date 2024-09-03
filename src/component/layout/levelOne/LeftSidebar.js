import React from "react";
import '../../.././App.css'

// LeftSidebar levelOne est le menu principal de navigation aligné à gauche de l'écran visible sur ttes les pages du backoffice
const LeftSidebar = () => {
    const onglets = 
    [
        {
            nom : 'Artiste',
            iconePathFile : 'https://api.testdwm.fr/uploads/artiste.png'
        },
        {
            nom : 'Scene',
            iconePathFile : 'https://api.testdwm.fr/uploads/scene.png'
        },
        {
            nom : 'Activite',
            iconePathFile : 'https://api.testdwm.fr/uploads/concert.png'
        },
        {
            nom: 'Commerce',
            iconePathFile : 'https://api.testdwm.fr/uploads/retail.png'
        }, 
        {
            nom : 'Carte',
            iconePathFile : 'https://api.testdwm.fr/uploads/marker.png'
        },
        {
            nom: 'Utilisateur',
            iconePathFile : 'https://api.testdwm.fr/uploads/users.png'
        }
    ];
    return (
        <div id="container-main-nav-left-sidebar">
            <nav id="main-nav-sidebar">
                <ul style={{textDecoration: 'none'}}>
                    {onglets.map((item, i) => (
                        <Onglet key={i} item={item} />
                    ))}
                </ul>
            </nav>
        </div>
    )
}

const Onglet = ({ item }) => {
    const url = encodeURIComponent(item?.nom.toLowerCase());    
    return (
        <li >
            <div >
                <img src={item?.iconePathFile} />
                <a href={`/${url}`}>{item?.nom}</a>
            </div>
        </li>
    )
}

export default LeftSidebar;