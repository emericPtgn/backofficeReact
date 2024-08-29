import { Button } from "primereact/button";

export default function DeleteButton2 ({tooltip, onClick}){
    return (
        <Button tooltip={tooltip || 'delete'} onClick={onClick} text rounded size="small" icon="pi pi-times" severity="danger" aria-label="Cancel" />
    )
}


