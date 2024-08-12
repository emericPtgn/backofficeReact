import React, { act, createElement, useEffect, useState } from "react";
import ActivityTable from "../../component/table/activity/ActivityTable";
import Header from "../../component/layout/levelTwo/Header";
import { useActiviteState } from "../../context/ActiviteContext";
import { useUpdateEffect } from 'primereact/hooks';
import ActiviteTable2 from "../../component/primereact/activite/ActiviteTable2";


const IS_LOADING = 'Fetching data from context...'
const NO_DATA = 'No data found'
const ERROR = 'Error while fetching data from context'

function Activity () {
    const { activities } = useActiviteState();
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState(IS_LOADING);

    useUpdateEffect(()=>{
        if(activities && activities.length > 0){
            setIsLoading(false);
            setStatus(activities.length ? '' : ERROR)
        } else {
            setIsLoading(false);
        }
        console.log(activities)
    }, [activities])


    return (
        <div className="container-level2">
            <Header />
            <div className="container-main-content-level2">
                {isLoading ? ( <p>{status}</p> ) : 
                (<ActiviteTable2 activities={activities}></ActiviteTable2>)
                }
            </div>
        </div>
    );
};

export default Activity;