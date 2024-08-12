import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useArtistesDispatch, useArtistesState } from '../../../context/ArtisteContext';
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
import { useNavigate } from 'react-router-dom';

const ActionButtons = React.memo(({ id, onEdit, onDelete }) => (
  <ButtonGroup>
    <Button label="Edit" size="small" icon="pi pi-pencil" onClick={() => onEdit(id)} aria-label="Edit artist" />
    <Button label="Delete" size="small" icon="pi pi-trash" onClick={() => onDelete(id)} aria-label="Delete artist" />
  </ButtonGroup>
));

export default function ArtistsTable() {
  const state = useArtistesState();
  const dispatch = useArtistesDispatch();
  const navigate = useNavigate();
  const [selectedArtists, setSelectedArtists] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const artists = useMemo(() => state.artistes, [state.artistes]);

  useEffect(() => {
    setLoading(false);
  }, [artists]);

  const handleEdit = useCallback((id) => {
    navigate(`/artiste-edit/${id}`);
  }, [navigate]);

  const handleDelete = useCallback((id) => {
    dispatch({ type: 'deleteArtist', payload: id });
  }, [dispatch]);

  const actionBodyTemplate = useCallback((rowData) => {
    return (<ActionButtons id={rowData.id} onEdit={handleEdit} onDelete={handleDelete}></ActionButtons>)
}, [handleEdit, handleDelete]);


  if (error) return <div>Error: {error}</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div className="card">
      <DataTable 
        value={artists} 
        selection={selectedArtists} 
        onSelectionChange={(e) => setSelectedArtists(e.value)} 
        dataKey="id" 
        tableStyle={{ minWidth: '50rem' }}
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
        <Column field="nom" header="Nom"></Column>
        <Column field="style" header="Style"></Column>
        <Column field="description" header="Description"></Column>
        <Column field="actions" header="Actions" body={actionBodyTemplate}></Column>
      </DataTable>
    </div>
  );
}