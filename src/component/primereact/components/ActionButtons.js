import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

/**
 * ActionButtons - A component that renders "Edit" and "Delete" buttons for a specific item.
 * When the delete button is clicked, a confirmation dialog appears.
 *
 * @param {string} id - The unique identifier for the item.
 * @param {function} onEdit - Callback function to be called when the "Edit" button is clicked.
 * @param {function} onDelete - Callback function to be called when the "Delete" button is confirmed.
 * @returns {JSX.Element} The rendered ActionButtons component.
 */
function ActionButtons({ id, onEdit, onDelete }) {
    const [visible, setVisible] = useState(false);

    // Content for the footer of the dialog
    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={() => { setVisible(false); onDelete(id); }} autoFocus />
        </div>
    );

    return (
        <div className="flex">
            <div className="container-table-action-btns">
                <Button className="table-btn" outlined label="Edit" size="small" icon="pi pi-pencil" onClick={() => onEdit(id)} aria-label="Edit scene" />
                <Button className="table-btn" outlined severity="danger"  label="Delete" size="small" icon="pi pi-external-link" onClick={() => setVisible(true)} />
            </div>
            <Dialog header="Confirmation" visible={visible} onHide={() => setVisible(false)} footer={footerContent}>
                <p className="m-0">
                    Vous supprimez un élément. Confirmer suppression ? 
                </p>
            </Dialog>
        </div>
    )
}

export default React.memo(ActionButtons);
