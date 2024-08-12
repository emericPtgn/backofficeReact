import { InputText } from "primereact/inputtext";

export const NameField = ({ value, onChange }) => {
    return (
        <div>
            <InputText
                name="nom"
                value={value}
                onChange={onChange}
                placeholder="Titre Activité"
                className="w-100"
            />
        </div>
    );
};