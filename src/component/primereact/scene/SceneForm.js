import React, { useCallback } from 'react';
import NameField from './NameField';
import DescriptionField from './DescriptionField';

const SceneForm = ({ scene, setScene }) => {
    const handleChange = useCallback((name, value) => {
        setScene(prevScene => ({
            ...prevScene,
            [name]: value
        }));
    }, [setScene]);

    return (
        <>
            <NameField value={scene.nom} onChange={handleChange} />
            <DescriptionField value={scene.description} onChange={handleChange} />
        </>
    );
};

export default SceneForm;
