import React, { useEffect } from "react";
import { ActiviteProvider, useActiviteDispatch } from "../../context/ActiviteContext";
import ActivityTable from "../../component/table/activity/ActivityTable";
import Header from "../../component/layout/levelTwo/Header";
import { getActivities } from "../../service/api";

// Composant principal pour l'activité
export default function ActivityComponent() {
    return (
        <ActiviteProvider>
            <Activity />
        </ActiviteProvider>
    );
}

// Composant pour afficher les activités
const Activity = () => {
    return (
        <div className="container-level2">
            <Header />
            <div className="container-main-content-level2">
                <ActivityTable />
            </div>
        </div>
    );
};
