import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import { useMarkerDispatch, useMarkerState } from '../../../context/MarkerContext';
import { deleteMarker } from '../../../service/api';
import ActionButtons from '../components/ActionButtons';
import { Toast } from 'primereact/toast';

export default function ScenesTable() {
    const { markers } = useMarkerState();
    const dispatch = useMarkerDispatch();
    const navigate = useNavigate();
    const [selectedScene, setSelectedScene] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const toast = useRef(null);

    const show = () => {
        toast.current.show({ severity : 'info', summary : 'info', detail : 'scene deleted ✅'})
    }

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
        const response = deleteMarker(id, dispatch);
        if(response.statut == 'success'){
            show();
        }
    }, [dispatch]);

    const actionBodyTemplate = useCallback((rowData) => (
        <ActionButtons id={rowData.id} onEdit={handleEdit} onDelete={handleDelete} />
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
                <Toast ref={toast} />
                <Column field="actions" header="Actions" body={actionBodyTemplate}></Column>
            </DataTable>
        </div>
    );
}
