import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useArtistesDispatch, useArtistesState } from '../../../context/ArtisteContext';
import { useNavigate } from 'react-router-dom';
import ActionButtons from '../components/ActionButtons';
import { Toast } from 'primereact/toast';
import { deleteArtiste } from '../../../service/api';

// const ActionButtons = React.memo(({ id, onEdit, onDelete }) => (
//   <ButtonGroup>
//     <Button label="Edit" size="small" icon="pi pi-pencil" onClick={() => onEdit(id)} aria-label="Edit artist" />
//     <Button label="Delete" size="small" icon="pi pi-trash" onClick={() => onDelete(id)} aria-label="Delete artist" />
//   </ButtonGroup>
// ));

export default function ArtistsTable() {
  const state = useArtistesState();
  const dispatch = useArtistesDispatch();
  const navigate = useNavigate();
  const [selectedArtists, setSelectedArtists] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useRef(null);
  

  const show = () => {
    toast.current.show({ severity : 'info', summary : 'info', detail : 'artiste deleted 🚮✅'})
  }
  const artists = useMemo(() => state.artistes, [state.artistes]);

  useEffect(() => {
    setLoading(false);
  }, [artists]);

  const handleEdit = useCallback((id) => {
    navigate(`/artiste-edit/${id}`);
  }, [navigate]);

  const handleDelete = useCallback(async (id) => {
    try {
      const response = await deleteArtiste(id, dispatch); // Attendre la résolution de la promesse
      console.log(response);
      if (response && response.status === 'success') {
        show(); // Afficher le toast si la suppression est réussie
      }
    } catch (error) {
      console.error('Error during delete:', error.message);
    }
  }, [dispatch]);
  

  const actionBodyTemplate = useCallback((rowData) => {
    return (<ActionButtons id={rowData.id} onEdit={handleEdit} onDelete={handleDelete} />)
    //<ActionButtons id={rowData.id} onEdit={handleEdit} onDelete={handleDelete}></ActionButtons>)
}, [handleEdit, handleDelete]);


  if (error) return <div>Error: {error}</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div className="card">
      <Toast ref={toast} />
      <DataTable 
        value={artists} 
        selection={selectedArtists} 
        onSelectionChange={(e) => setSelectedArtists(e.value)} 
        dataKey="id" 
        tableStyle={{ minWidth: '50rem' }}
        paginator
        rows={10} // Display 10 users per page
        responsiveLayout="scroll"
        className='table-layout'
      >
        <Column sortable field="nom" header="Nom"></Column>
        <Column sortable field="styles" header="Style"></Column>
        <Column sortable field="description" header="Description"></Column>

        <Column field="actions" header="Actions" body={actionBodyTemplate} className='default-column-width'></Column>
      </DataTable>
    </div>
  );
}