import { Button } from "primereact/button";

export default function DeleteButton2 ({onClick}){
    return (
        <Button onClick={onClick} size="small" icon="pi pi-times" severity="danger" aria-label="Cancel" />
    )
}


