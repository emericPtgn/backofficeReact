import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { updatePassWord } from "../../../service/api";
import { Toast } from "primereact/toast";

const ResetPass = () => {
    const { token } = useParams();
    const toast = useRef(null);
    const [value, setValue] = useState("");

    const show = () => {
        toast.current.show({
            severity: 'info',
            summary: 'Info',
            detail: 'Password updated successfully ✅',
        });
    };

    const handleChange = (e) => {
        console.log(e.target.value)
        setValue(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await updatePassWord(value, token);
        if(response.status === 'success'){
            console.log(response.status);
            show();
        }
    };

    return (
        <>
            <Toast ref={toast} />
            <ResetPassForm value={value} onSubmit={handleSubmit} onChange={handleChange} />
        </>
    );
};

export default ResetPass;

const ResetPassForm = ({ value, onSubmit, onChange }) => {
    return (
        <form id="resetPassForm" onSubmit={onSubmit}>
            <label htmlFor='resetPass'>New Password</label>
            <input
                type="password"
                value={value}
                name="resetPass"
                id='resetPass'
                onChange={onChange}
            />
            <button type="submit">Reset Password</button>
        </form>
    );
};
