import React from "react";
import '../../.././App.css'

// LeftSidebar levelOne est le menu principal de navigation aligné à gauche de l'écran visible sur ttes les pages du backoffice
const LeftSidebar = () => {
    const onglets = 
    [
        {
            nom : 'Artiste',
            iconePathFile : '/uploads/artiste.png'
        },
        {
            nom : 'Scene',
            iconePathFile : '/uploads/scene.png'
        },
        {
            nom : 'Activite',
            iconePathFile : '/uploads/concert.png'
        },
        {
            nom: 'Commerce',
            iconePathFile : '/uploads/retail.png'
        }, 
        {
            nom : 'Carte',
            iconePathFile : '/uploads/marker.png'
        },
        {
            nom: 'Utilisateur',
            iconePathFile : '/uploads/users.png'
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