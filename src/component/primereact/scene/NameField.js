import { InputText } from "primereact/inputtext";

const NameField = ({ scene, onChange }) => {
    return (
        <InputText
            name="nom"
            value={scene?.nom || ''}
            onChange={onChange}
            placeholder="Scene rap, scene montagne ..."
        />
    );
};

export default NameField;