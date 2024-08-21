// tableau utilisateur
// component primereact
// données : users 
// moyen d'accés aux données : 
// objectif : visualiser les users (page de 10)
// données afficheés : nom, email, dernière modif
// actions : créer nouvel utilisateur, navigueur page édit, demande supprime user, trie du tableau
import React, { useState, useRef, useCallback, memo, useMemo } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { useUserDispatch, useUserState } from "../../../context/UserContext";
import ActionButtons from '../components/ActionButtons';
import { Toast } from "primereact/toast";
import { deleteUser } from "../../../service/api";
import { useNavigate } from "react-router-dom";

const UserTable2 = ({users}) => {
    const toast = useRef(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const dispatch = useUserDispatch();
    const navigate = useNavigate();

    const show = (message, severity = 'info') => {
        toast.current.show({ severity, summary: 'Info', detail: message });
    };

    const handleDelete = useCallback(async (id) => {
        try {
            const response = await deleteUser(id, dispatch);
            if (response.status === 'success') {
                show('User successfully deleted', 'success');
            } else {
                show('Failed to delete user', 'error');
            }
        } catch (error) {
            show('An error occurred while deleting the user', 'error');
        }
    }, [dispatch]);

    const handleEdit = useCallback((id) => {
        navigate(`/utilisateur-edit/${id}`);
    }, [navigate]);

    const actionButtons = useCallback((rowData) => {
        return (
            <ActionButtons id={rowData?.id} onEdit={() => handleEdit(rowData.id)} onDelete={() => handleDelete(rowData.id)} />
        );
    }, [handleDelete, handleEdit]);

    return (
        <>
            <Toast ref={toast} />
            <DataTable 
                value={users ? users : ''} 
                selection={selectedUser} 
                onSelectionChange={(e) => setSelectedUser(e.value)} 
                dataKey="id"
                paginator
                rows={10} // Display 10 users per page
                responsiveLayout="scroll"
            >
                <Column selectionMode="multiple" />
                <Column field="email" header="Email" sortable />
                <Column field="roles" header="Roles" sortable />
                <Column field="dateModification" header="Dernière Modification" sortable />
                <Column body={actionButtons} />
            </DataTable>
        </>
    );
};

export default memo(UserTable2);
