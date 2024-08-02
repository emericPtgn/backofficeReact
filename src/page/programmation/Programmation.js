import React, { useEffect } from "react";
import { useState } from "react";
import Header from "../../component/layout/levelTwo/Header";
import ProgrammationTable from "../../component/table/programmation/ProgrammationTable";
import { ProgrammationProvider, useProgrammationDispatch, useProgrammationDispatchContext } from "../../context/ProgrammationContext";
import { getProgrammations } from "../../service/api";

export default function ProgrammationComponent(){
    return (
        <ProgrammationProvider>
            <Programmation></Programmation>
        </ProgrammationProvider>
    )
}
const Programmation = () => {
    const dispatch = useProgrammationDispatch();
    useEffect(()=>{
        getProgrammations(dispatch)
    }, [dispatch])
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
