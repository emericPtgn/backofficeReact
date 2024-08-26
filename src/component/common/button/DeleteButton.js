import { Button } from "primereact/button";

export default function DeleteButton (handleOnClick){
    return (
        <Button label="Supprimer" icon="pi pi-times" severity="danger" size="small"  outlined onClick={handleOnClick}/>
    )
}