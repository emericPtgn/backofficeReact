import React, { useEffect, useState } from "react";
import { NameField } from "../components/NameField";
import { InputTextarea } from 'primereact/inputtextarea';
import { CommerceTypes2 } from "./CommerceType2";
import { ProductType } from "./ProductType";
import FileUpload2 from "./FileUpload2";

const CommerceForm = ({ commerce, commerces, setCommerce, onChange }) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (commerce?.photos) {
            const initializedFiles = commerce.photos.map(file => {
                if (file instanceof Blob) {
                    return {
                        url: URL.createObjectURL(file),
                        file,
                        isNew: false,
                    };
                }
                return { url: file, file: null, isNew: false };
            });
            setFiles(initializedFiles);
        }
    }, [commerce]);

    const onSelect = (e) => {
        const selectedFiles = Array.from(e.files);
        const newFiles = selectedFiles.map(file => ({
            url: URL.createObjectURL(file),
            file,
            isNew: true,
        }));

        setCommerce(prevCommerce => ({
            ...prevCommerce,
            photos: [...(prevCommerce.photos || []), ...newFiles]
        }));
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
    };

    const onRemove = (index) => {
        setFiles(prevFiles => {
            const newFiles = prevFiles.filter((_, i) => i !== index);
            setCommerce(prevCommerce => ({
                ...prevCommerce,
                photos: newFiles.map(file => file.file || file.url)
            }));
            if (prevFiles[index].file instanceof Blob) {
                URL.revokeObjectURL(prevFiles[index].url); // Révoquer l'URL pour éviter les fuites de mémoire
            }
            return newFiles;
        });
    };

    return (
        <div className="form-commerce">
            <NameField name='nom' value={commerce?.nom || ''} placeholder="test" onChange={onChange} />
            <InputTextarea name="description" value={commerce?.description || ''} onChange={onChange} />
            <div className="form-commerce-p2">
                <CommerceTypes2 name="typeCommerce" commerce={commerce} commerces={commerces} value={commerce?.typeCommerce?.nom || ''} onChange={onChange} />
                <ProductType name="typeProduit" commerce={commerce} commerces={commerces} value={commerce?.typeProduit?.nom || ''} onChange={onChange} />
            </div>
            {/* <FileUpload2 name="photos" commerce={commerce} value={commerce?.photos} setCommerce={setCommerce} onSelect={onSelect} files={files} setFiles={setFiles} onRemove={onRemove} /> */}
        </div>
    );
};

export default CommerceForm;
