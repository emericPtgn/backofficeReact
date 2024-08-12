import { useState } from "react";
import { SelectButton } from "primereact/selectbutton";

export function SelectTypeActivity({ value, onChange }) {
    const options = ['Concert', 'Dedicace', 'Jeux'];
    return (
        <div className="card flex justify-content-center">
            <SelectButton name="type" value={value} onChange={(e) => onChange(e.value, e.target.name)} options={options} defaultValue={'Concert'}/>
        </div>
    );
}
