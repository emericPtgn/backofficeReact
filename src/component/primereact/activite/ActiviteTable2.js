import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ButtonGroup } from "primereact/buttongroup";
import { Button } from "primereact/button";
import { useActiviteDispatch } from "../../../context/ActiviteContext";
import { useMemo } from "react";


const ActionButtons = React.memo(({ id, onEdit, onDelete }) => (
    <ButtonGroup>
      <Button label="Edit" size="small" icon="pi pi-pencil" onClick={() => onEdit(id)} aria-label="Edit artist" />
      <Button label="Delete" size="small" icon="pi pi-trash" onClick={() => onDelete(id)} aria-label="Delete artist" />
    </ButtonGroup>
  ));

function ActiviteTable2({activities}){
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [loading, setIsLoading] = useState(true);
    const listActivities = useMemo(() => activities, [activities]);
    const dispatch = useActiviteDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        setIsLoading(false);
    }, [listActivities])

    const handleEdit = useCallback((id) => {
        navigate(`/activite-edit/${id}`);
      }, [navigate]);

    const handleDelete = useCallback((id)=>{
        dispatch({type: 'deleteActivite', payload: id});
    },[dispatch]);

    const actionButtons = useCallback((rowData)=>{
        return(
            <ActionButtons id={rowData.id} onEdit={handleEdit} onDelete={handleDelete}></ActionButtons>
        )
    }, [handleDelete, handleEdit])
    

    if (loading) return <div>Loading...</div>;

    return (
        <DataTable value={listActivities} selection={selectedActivity} onSelectionChange={(e) => setSelectedActivity(e.target.value)} dataKey="id">
            <Column field="nom" header="Nom"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="date" header="Date"></Column>
            <Column field="actions" header="Actions" body={actionButtons}></Column>
        </DataTable>
    )
}

export default ActiviteTable2;
