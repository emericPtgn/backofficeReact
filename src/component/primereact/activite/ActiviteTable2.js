import React, { useCallback, useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useActiviteDispatch, useActiviteState } from "../../../context/ActiviteContext";
import { Toast } from "primereact/toast";
import { deleteActivity } from "../../../service/api";
import ActionButtons from "../components/ActionButtons";

// const ActionButtons = React.memo(({ id, onEdit, onDelete }) => (
//     <ButtonGroup>
//       <Button label="Edit" size="small" icon="pi pi-pencil" onClick={() => onEdit(id)} aria-label="Edit artist" />
//       <Button label="Delete" size="small" icon="pi pi-trash" onClick={() => onDelete(id)} aria-label="Delete artist" />
//     </ButtonGroup>
//   ));

const ActiviteTable2 = () => {
    const state = useActiviteState()
    const dispatch = useActiviteDispatch(); // Utilisation du hook pour obtenir dispatch
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [loading, setIsLoading] = useState(true);
    const activities = useMemo(() => state.activities, [state.activities]);

    const navigate = useNavigate();
    const toast = useRef(null);
  
    const show = () => {
      toast.current.show({severity : 'info', summary : 'info', detail : 'activity deleted ✅'})
    }
  
    useEffect(() => {
      setIsLoading(false);
    }, [activities])
  
    const handleEdit = useCallback((id) => {
      navigate(`/activite-edit/${id}`);
    }, [navigate]);
  
    const handleDelete = useCallback( async (id)=>{
        const response = await deleteActivity(id, dispatch)
        if(response.status == 'success'){
            show();
        }
    }, [dispatch]);
  
    const actionButtons = useCallback((rowData) => (
      <ActionButtons id={rowData.id} onEdit={handleEdit} onDelete={handleDelete} />
    ), [handleDelete, handleEdit]);
  
    if (loading) return <div>Loading...</div>;
  
    return (
    <>
    <Toast ref={toast}/>    
    <DataTable
        value={activities}
        selection={selectedActivity}
        onSelectionChange={(e) => setSelectedActivity(e.value)}
        dataKey="id"
        paginator
        rows={10}
        responsiveLayout="scroll"
      >
        <Column sortable field="nom" header="Nom"></Column>
        <Column sortable field="type" header="Type"></Column>
        <Column sortable field="date" header="Date"></Column>

        <Column field="actions" header="Actions" body={actionButtons} className="default-column-width"></Column>
      </DataTable>
    </>

    );
  }
  

export default ActiviteTable2;
