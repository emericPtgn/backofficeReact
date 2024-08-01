import React from "react";
import Header from "../../component/layout/levelTwo/Header";
import ActivityTable from "../../component/table/activity/ActivityTable";

const Activity = () => {
    return (
        <>
        <div className="container-level2">
            <Header />
        <div className="container-main-content-level2">
            <ActivityTable />
        </div>
        </div>
        </>
    )
}

export default Activity;