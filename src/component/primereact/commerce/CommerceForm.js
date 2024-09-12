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


    return (
        <div className="form-commerce">
            <NameField tooltip='Nom commerce' name='nom' value={commerce?.nom || ''} placeholder="test" onChange={onChange} />
            <InputTextarea tooltip="Description commerce" name="description" value={commerce?.description || ''} onChange={onChange} />
            <div className="form-commerce-p2">
                <CommerceTypes2 tooltip="Type Commerce" name="groupe" commerce={commerce} commerces={commerces} value={commerce?.groupe || ''} onChange={onChange} />
                <ProductType tooltip="Type Produit" name="sousGroupe" commerce={commerce} commerces={commerces} value={commerce?.sousGroupe || ''} onChange={onChange} />
            </div>
            {/* <FileUpload2 name="photos" commerce={commerce} value={commerce?.photos} setCommerce={setCommerce} onSelect={onSelect} files={files} setFiles={setFiles} onRemove={onRemove} /> */}
        </div>
    );
};

export default CommerceForm;
