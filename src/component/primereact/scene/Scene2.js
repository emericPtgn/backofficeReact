import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
import { useNavigate } from 'react-router-dom';
import { useMarkerDispatch, useMarkerState } from '../../../context/MarkerContext';

const ActionTemplate = React.memo(({ id, onEdit, onDelete }) => (
    <ButtonGroup>
        <Button label="Edit" size="small" icon="pi pi-pencil" onClick={() => onEdit(id)} aria-label="Edit scene" />
        <Button label="Delete" size="small" icon="pi pi-trash" onClick={() => onDelete(id)} aria-label="Delete scene" />
    </ButtonGroup>
));

export default function ScenesTable() {
    const { markers } = useMarkerState();
    const dispatch = useMarkerDispatch();
    const navigate = useNavigate();
    const [selectedScene, setSelectedScene] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Correct filtering and memoization
    const scenes = useMemo(() => {
        if (!markers) return [];
        return markers.filter(marker => marker.type === 'scene');
    }, [markers]);

    useEffect(() => {
        if (markers) {
            setLoading(false);
        }
    }, [markers]);

    const handleEdit = useCallback((id) => {
        navigate(`/scene-edit/${id}`);
    }, [navigate]);

    const handleDelete = useCallback((id) => {
        dispatch({ type: 'deleteScene', payload: id });
    }, [dispatch]);

    const actionBodyTemplate = useCallback((rowData) => (
        <ActionTemplate id={rowData.id} onEdit={handleEdit} onDelete={handleDelete} />
    ), [handleEdit, handleDelete]);

    if (error) return <div>Error: {error}</div>;
    if (loading) return <div>Loading...</div>;

    return (
        <div className="card">
            <DataTable
                value={scenes}
                selection={selectedScene}
                onSelectionChange={(e) => setSelectedScene(e.value)}
                dataKey="id"
                tableStyle={{ minWidth: '50rem' }}
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="nom" header="Nom"></Column>
                <Column field="description" header="Description"></Column>
                <Column field="actions" header="Actions" body={actionBodyTemplate}></Column>
            </DataTable>
        </div>
    );
}
