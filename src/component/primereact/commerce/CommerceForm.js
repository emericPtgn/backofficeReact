import React from "react";
import { NameField } from "../components/NameField";
import { InputTextarea } from 'primereact/inputtextarea';
import { CommerceTypes2 } from "./CommerceType2";
import { ProductType } from "./ProductType";

const CommerceForm = ({commerce, setCommerce, commerces, onChange}) => {

    return (
        <>
        <div className="d-flex flex-column">
            <NameField name='nom' value={commerce?.nom || ''} placeholder="test" onChange={(e) => onChange(e)} />
            <InputTextarea name="description" value={commerce?.description || '' } onChange={onChange}  />
            <CommerceTypes2 name="typeCommerce" commerce={commerce} commerces={commerces} value={commerce?.typeCommerce?.nom || ''} onChange={onChange} />
            <ProductType  name="typeProduit" commerce={commerce} commerces={commerces} value={commerce?.typeProduit?.nom || ''} onChange={onChange}/>
        </div>
        </>
    )
}

export default CommerceForm;