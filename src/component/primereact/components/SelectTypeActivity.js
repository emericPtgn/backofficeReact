import { useState } from "react";
import { SelectButton } from "primereact/selectbutton";

export function SelectTypeActivity({ value, onChange }) {
    const options = ['Concert', 'Dedicace', 'Jeux'];
    return (
        <SelectButton tooltip="Type activité" name="type" value={value} onChange={(e) => onChange(e.value, e.target.name)} options={options} defaultValue={'Concert'}/>
    );
}
