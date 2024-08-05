import React, { useEffect } from "react";
import Header from "../../component/layout/levelTwo/Header";
import ProgrammationTable from "../../component/table/programmation/ProgrammationTable";

const Programmation = () => {

    return (
        <>
        <div className="container-level2">
            <Header />
            <div className="container-main-content-level2">
                <ProgrammationTable />
            </div>
        </div>
        </>
    )
}

export default Programmation;
