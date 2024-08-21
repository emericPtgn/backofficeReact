import { useState } from "react";
import { InputText } from "primereact/inputtext";

const EmailSection = ({user, setUser}) => {
    const [value, setValue] = useState(user?.email || '');
    console.log({user})
    return (
        <InputText type="email" value={value} onChange={(e) => setValue(e.value)} />
    )
}

export default EmailSection;