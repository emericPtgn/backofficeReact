import React from "react";
import { AutoCompletType } from "./AutoCompletType";

export default function MapForm({ marker, onChange }) {
    return (
        <>
            <AutoCompletType value={marker?.type} onChange={onChange} />
        </>
    );
}
