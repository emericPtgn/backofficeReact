import { InputTextarea } from "primereact/inputtextarea";

const DescriptionField = ({ scene, onChange }) => {
    return (
        <InputTextarea
            name="description"
            value={scene?.description || ''}
            onChange={onChange}
            placeholder="Retrouvez les rois de la pop anglaise"
        />
    );
};

export default DescriptionField;