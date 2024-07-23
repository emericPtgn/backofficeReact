import React from "react";
import Header from "./Header";
import RightSidebar from "./RightSidebar";
import Main from "./MainContent";


const LevelTwoLayout = () => {
    return (
        <>
        <div id="container-level2">
        <Header />
        <MainContent />
        <RightSidebar />
        </div>
        </>
    )
}

export default LevelTwoLayout;