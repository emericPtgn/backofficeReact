import React from "react";
import CommerceTable from "../../component/table/commerce/CommerceTable";
import Header from "../../component/layout/levelTwo/Header";


const Commerce = () => {

    return (
        <div className="container-level2">
            <Header />
            <div className="container-main-content-level2">
                <CommerceTable />
            </div>
        </div>
    );
};

export default Commerce;