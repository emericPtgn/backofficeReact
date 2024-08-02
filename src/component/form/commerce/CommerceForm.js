import React from "react";
import { Form } from "react-router-dom";

const CommerceForm = ({commerce, setCommerce}) => {
    const handleOnChange = (e) => {
        return ('')
    }
    return (
        <>
        <form>
            <div>
                <label for='nom'>NOM</label>
                <input type="text" name="nom" value={commerce?.nom || ''} placeholder={'nom commerce'} onChange={(e) => handleOnChange()}/>
                <label for='typeCommerce'>TYPE COMMERCE</label>
                <select value={commerce?.typeCommerce?.nom}>
                    <option value={''}></option>
                </select>
                <label for='typeProduit'>TYPE PRODUIT</label>
                <select value={commerce?.typeProduit?.nom}>
                    <option></option>
                </select>
                <label for='description'>DESCRIPTION</label>
                <input type="text" name="description" value={commerce?.description || ''} placeholder={'description commerce'} onChange={(e) => handleOnChange}/>
                <label for='social'>RESEAU SOCIAL</label>
                <input type="text" name="" value={commerce?.reseauSocial || ''} placeholder={'ex : toktok.fr/noodlebee'} onChange={(e) => handleOnChange}/>
            </div>
            <div>
                <label>EMPLACEMENT</label>
                <input/>
            </div>
        </form>
        </>
    )
}

export default CommerceForm;