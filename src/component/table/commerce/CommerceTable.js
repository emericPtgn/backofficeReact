import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
import { useNavigate } from 'react-router-dom';
import { useCommercesDispatch, useCommercesState } from '../../../context/CommerceContext';


const ActionsButtons = React.memo(({id, onEdit, onDelete}) => (
    <ButtonGroup>
        <Button onClick={() => onEdit(id)}>edit</Button>
        <Button onClick={() => onDelete(id)}>delete</Button>
    </ButtonGroup>
));


const CommerceTable = () => {

    const state = useCommercesState();
    if(state.commerces){
        console.log(state.commerces)
    }
    const {dispatch} = useCommercesDispatch();
    const [selectedCommerce, setSelectedCommerce] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const commerces = useMemo(()=> state.commerces, [ state.commerces ])
    const commerceExemple = [{id: 23, nom: "kebab-king", description: "le roi du kebab", "typeProduit": "kebab", "typeCommerce":"restauration"}]

    useEffect(() => {
        setLoading(false);
      }, [commerces]);

    const handleDelete = useCallback((id)=>{
        dispatch({type: 'deleteCommerce', payload: id})
    }, [dispatch]);

    const handleEdit = useCallback((id)=>{
        navigate(`/commerce-edit/${id}`);
    }, [navigate])

    const actionsButtons = useCallback((rowData)=>{
        return <ActionsButtons id={rowData.id} onDelete={handleDelete} onEdit={handleEdit}></ActionsButtons>
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
            <Column  header="actions" body={actionsButtons}></Column>
        </DataTable>
        </>
    )
}

export default CommerceTable;