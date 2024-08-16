import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { useParams } from 'react-router-dom';

export default function UploadIcone({ onUploadComplete }) {
    const { id } = useParams();
    const toast = useRef(null);

    const onSelect = (event) => {
        if (event.files && event.files[0]) {
            const file = event.files[0];
            if (onUploadComplete) {
                onUploadComplete(file);
            }
        }
    };

    return (
        <div className="card flex justify-content-center">
            <Toast ref={toast}></Toast>
            <FileUpload 
                mode="basic" 
                name="icone" 
                accept="image/*" 
                maxFileSize={1000000} 
                onSelect={onSelect} 
            />
        </div>  
    );
}