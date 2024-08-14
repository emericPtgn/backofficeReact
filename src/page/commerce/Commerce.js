import React, { useEffect } from "react";
import { CommercesProvider, useCommercesState } from "../../context/CommerceContext";
import CommerceTable from "../../component/table/commerce/CommerceTable";
import Header from "../../component/layout/levelTwo/Header";
import { getCommerces } from "../../service/api";
import { useCommercesDispatch } from "../../context/CommerceContext";


export const Commerce = () => {

    return (
        <div className="container-level2">
            <Header />
            <div className="container-main-content-level2">
                <CommerceTable />
            </div>
        </div>
    );
};

