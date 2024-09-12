import React from "react";
import Header from "../../component/layout/levelTwo/Header";
import ActiviteTable2 from "../../component/primereact/activite/ActiviteTable2";

const Activity = () => {


    return (
        <div className="container-level2">
            <Header />
            <div className="container-main-content-level2">
                <ActiviteTable2 />
            </div>
        </div>
    );
};

export default Activity;