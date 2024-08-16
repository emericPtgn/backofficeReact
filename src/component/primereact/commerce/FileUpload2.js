import React, { useState, useEffect } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { useUpdateEffect } from 'primereact/hooks';
import btnSup from '../../../ressources/bouton-supprimer.png'

const FileUpload2 = ({ onSelect, files, onRemove }) => {

    const renderFilePreview = () => {
        return files.map((file, index) => (
            <div key={index} className="file-preview" style={{ position: 'relative', display: 'inline-block', margin: '5px' }}>
                <img src={file.url} alt={`preview ${index}`} style={{ width: '100px', height: '100px' }} />
                <button
                    style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        background: 'red',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        padding: '5px'
                    }}
                    onClick={() => onRemove(index)}
                >
                    X
                </button>
            </div>
        ));
    };

    return (
        <div className="card">
            <FileUpload
                name="photos"
                multiple
                accept="image/*"
                maxFileSize={1000000}
                onSelect={onSelect}
                emptyTemplate={<p className="m-0">Glissez et déposez des fichiers ici pour les télécharger.</p>}
                removeIcon={btnSup}
            />
            <div className="file-previews">
                {renderFilePreview()}
            </div>
        </div>
    );
};

export default FileUpload2;
