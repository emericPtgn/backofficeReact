import { InputText } from "primereact/inputtext";

export const NameField = ({ value, onChange }) => {
    return (
        <div>
            <InputText
                name="nom"
                value={value}  // Utilisation de `value` au lieu de `defaultValue`
                onChange={onChange}
                placeholder="Nom"
                className="w-100"
            />
        </div>
    );
};
