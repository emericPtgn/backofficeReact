

function body () {
    return (
        <>
            <div className="top-header">
                <div className="logo">
                    <img src="/uploads/dj.png" alt="logoface" className="logoface"/>
                    <a href="https://pro.testdwm.fr/dashboard"><p className="sitename">Live Event</p></a>
                </div>
                <div className="ham-menu">
                    <button id="hamburger">
                        <span></span>   
                        <span></span>   
                    </button>
                </div>
                <div className="menu-hide">
                    <a href="https://app.testdwm.fr"><p>Voir site</p></a>
                    <a href="https://pro.testdwm.fr/logout"><p>Deconnexion</p></a>
                </div>
            </div>
            <main>
                <div className="main-two-cols">
                    <div className="sidebar">
                        <div className="sidebar-item">
                            <img src="/public/uploads/artistes" />
                            <div>
                                <a href="https://pro.testdwm.fr/artistes">
                                    <p>artistes</p>
                                </a>
                            </div>
                        </div>
                        <div className="sidebar-item">
                            <img src="/public/uploads/concert"/>
                            <div>
                                <a href="https://pro.testdwm.fr/activites">
                                    <p>activites</p>
                                </a>
                            </div>
                        </div>
                        <div className="sidebar-item">
                            <img src="/public/uploads/lumieres-de-scene.png" />
                            <div>
                                <a href="https://pro.testdwm.fr/scenes">
                                    <p>scenes</p>
                                </a>
                            </div>
                        </div>
                        <div className="sidebar-item">
                            <img src="/public/uploads/retail.png" />
                            <div>
                                <a href="https://pro.testdwm.fr/commerces">
                                    <p>commerces</p>
                                </a>
                            </div>
                        </div>
                        <div className="sidebar-item">
                            <img src="/public/uploads/users.png" />
                            <div>
                                <a href="https://pro.testdwm.fr/utilisateurs">
                                    <p>utilisateurs</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer" id="footer"></div>
            </main>
        </>
    )
}
export default body;    
