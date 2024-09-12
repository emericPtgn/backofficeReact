import React, { useState, useEffect, useCallback, useMemo, useRef} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import ActionButtons from '../../primereact/components/ActionButtons';
import { deleteCommerce } from '../../../service/api';
import { useMarkerDispatch, useMarkerState } from '../../../context/MarkerContext';
import { deleteMarker } from '../../../service/api';
// const ActionsButtons = React.memo(({id, onEdit, onDelete}) => (
//     <ButtonGroup>
//         <Button onClick={() => onEdit(id)}>edit</Button>
//         <Button onClick={() => onDelete(id)}>delete</Button>
//     </ButtonGroup>
// ));


const CommerceTable = () => {

    const {markers} = useMarkerState();
    const dispatch = useMarkerDispatch();
    const [selectedCommerce, setSelectedCommerce] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const commerces = useMemo(() => {
        if (!markers) return [];
        return markers.filter(marker => marker.type === 'commerce');
    }, [markers]);

    const toast = useRef(null);

    const show = () => {
        toast.current.show({severity : 'info', summary : 'info', detail : 'commerce deleted 🏬🚮' })
    }

    useEffect(() => {
        setLoading(false);
      }, [commerces]);

    const handleDelete = useCallback( async (id)=>{
        const response = await deleteMarker(id, dispatch)
        if(response.status == 'success'){
            show();
        }
    }, [dispatch]);

    const handleEdit = useCallback((id)=>{
        navigate(`/commerce-edit/${id}`);
    }, [navigate])

    const actionsButtons = useCallback((rowData)=>{
        return <ActionButtons id={rowData.id} onDelete={handleDelete} onEdit={handleEdit}></ActionButtons>
    }, [handleDelete, handleEdit])

    if(error){
        return <div>error occured : {error}</div>
    }
    if(loading){
        return <div>loading..</div>
    }

    return (
        <>
        <Toast ref={toast} />
        <DataTable 
        value={commerces} 
        selection={selectedCommerce} 
        onSelectionChange={(e) => setSelectedCommerce(e.value) } 
        dataKey="id" 
        tableStyle={{ minWidth: '50rem' }}
        paginator
        rows={10} // Display 10 users per page
        responsiveLayout="scroll"
         >
            <Column sortable field="nom" header="nom"></Column>
            <Column sortable field="groupe" header="groupe"></Column>
            <Column sortable field="sousGroupe" header="produit"></Column>
            <Column sortable field="icone" header="icone"></Column>
            <Toast ref={toast} />
            <Column  header="Actions" body={actionsButtons} className='default-column-width'></Column>
        </DataTable>
        </>
    )
}

export default CommerceTable;