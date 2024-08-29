import React from "react";
import { useEffect } from "react";

export default function FindByIdAndSetDocument(effectif, id, setDocument, setStatus, setLoading){
    useEffect(()=>{
        if(effectif && effectif.length > 0){
            let documentToEdit = effectif.find(item => item.id === id);
            if(documentToEdit){
                setDocument(documentToEdit);
                setStatus('data found');
            } else {
                setStatus('data not found');
            } setLoading(false);
        } else {
            setStatus('no effectif found');
            setLoading(false);
        }
    }, [effectif, id]);
} 