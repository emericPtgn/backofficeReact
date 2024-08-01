import React from "react";
import Header from "../../component/layout/levelTwo/Header";
import EventTable from "../../component/table/event/EventTable";

const Event = () => {
    return (
        <>
        <div className="container-level2">
        <Header />
        <div className="container-main-content-level2">
            <EventTable />
        </div>
        </div>
        </>
    )
}

export default Event;