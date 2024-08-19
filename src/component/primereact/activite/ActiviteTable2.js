import React, { useCallback, useEffect, useState, useNavigate, useMemo, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useActiviteDispatch } from "../../../context/ActiviteContext";
import { Toast } from "primereact/toast";
import { deleteActivity } from "../../../service/api";
import ActionButtons from "../components/ActionButtons";

// const ActionButtons = React.memo(({ id, onEdit, onDelete }) => (
//     <ButtonGroup>
//       <Button label="Edit" size="small" icon="pi pi-pencil" onClick={() => onEdit(id)} aria-label="Edit artist" />
//       <Button label="Delete" size="small" icon="pi pi-trash" onClick={() => onDelete(id)} aria-label="Delete artist" />
//     </ButtonGroup>
//   ));

function ActiviteTable2({activities}){
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [loading, setIsLoading] = useState(true);
    const listActivities = useMemo(() => activities, [activities]);
    const dispatch = useActiviteDispatch();
    const navigate = useNavigate();
    const toast = useRef(null);

    const show = () => {
        toast.current.show({severity : 'info', summary : 'info', detail : 'activity deleted ✅'})
    }
    useEffect(()=>{
        setIsLoading(false);
    }, [listActivities])

    const handleEdit = useCallback((id) => {
        navigate(`/activite-edit/${id}`);
      }, [navigate]);

    const handleDelete = useCallback((id, dispatch)=>{
        const response = deleteActivity(id, dispatch);
        if(response.statut == 'success'){
            show();
        }
    },[dispatch]);

    const actionButtons = useCallback((rowData)=>{
        return(
            <ActionButtons id={rowData.id} onEdit={handleEdit} onDelete={handleDelete} />
        )
    }, [handleDelete, handleEdit])
    

    if (loading) return <div>Loading...</div>;

    return (
        <DataTable value={listActivities} selection={selectedActivity} onSelectionChange={(e) => setSelectedActivity(e.target.value)} dataKey="id">
            <Column field="nom" header="Nom"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="date" header="Date"></Column>
            <Toast ref={toast}/>
            <Column field="actions" header="Actions" body={actionButtons}></Column>
        </DataTable>
    )
}

export default ActiviteTable2;
