import React, { useState, useEffect, useCallback, useMemo, useRef} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import { useCommercesDispatch, useCommercesState } from '../../../context/CommerceContext';
import { Toast } from 'primereact/toast';
import ActionButtons from '../../primereact/components/ActionButtons';
import { deleteCommerce } from '../../../service/api';

// const ActionsButtons = React.memo(({id, onEdit, onDelete}) => (
//     <ButtonGroup>
//         <Button onClick={() => onEdit(id)}>edit</Button>
//         <Button onClick={() => onDelete(id)}>delete</Button>
//     </ButtonGroup>
// ));


const CommerceTable = () => {

    const state = useCommercesState();
    const dispatch = useCommercesDispatch();
    const [selectedCommerce, setSelectedCommerce] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const commerces = useMemo(()=> state.commerces, [ state.commerces ]);
    const toast = useRef(null);

    const show = () => {
        toast.current.show({severity : 'info', summary : 'info', detail : 'commerce deleted 🏬🚮' })
    }

    useEffect(() => {
        setLoading(false);
      }, [commerces]);

    const handleDelete = useCallback((id)=>{
        const response = deleteCommerce(id, dispatch)
        if(response.statut == 'success'){
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

    console.log(state.commerces)
    return (
        <>
        <DataTable value={commerces} selection={selectedCommerce} onSelectionChange={(e) => setSelectedCommerce(e.value) } dataKey="id" tableStyle={{ minWidth: '50rem' }} >
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            <Column sortable field="nom" header="nom"></Column>
            <Column sortable field="typeCommerce.nom" header="type"></Column>
            <Column sortable field="typeProduit.nom" header="produit"></Column>
            <Toast ref={toast} />
            <Column  header="actions" body={actionsButtons}></Column>
        </DataTable>
        </>
    )
}

export default CommerceTable;