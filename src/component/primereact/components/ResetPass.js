import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updatePassWord } from "../../../service/api";
import { Toast } from "primereact/toast";

const ResetPass = () => {
    const { token } = useParams();
    const toast = useRef(null);
    const [value, setValue] = useState({
        password: ''
    });
    const navigate = useNavigate();

    const showToast = (severity, summary, detail) => {
        toast.current.show({
            severity,
            summary,
            detail,
        });
    };

    const handleChange = (e) => {
        setValue((prev) => ({...prev, password: e.target.value}));
        console.log(value);
    };

    useEffect(()=>{
        console.log(value);
    }, [value])

    const handleClick = async () => {
        if (!value.password) {
            showToast('error', 'Erreur', 'Veuillez entrer un mot de passe.');
            return;
        }

        try {
            const response = await updatePassWord({ password: value.password }, token);
            if (response.status === 'success') {
                showToast('info', 'Info', 'Password updated successfully ✅');
                navigate("/login");
            } else {
                showToast('error', 'Erreur', response.message || 'Une erreur est survenue.');
            }
        } catch (error) {
            showToast('error', 'Erreur', 'Une erreur réseau est survenue.');
        }
    };

    return (
        <>
            <Toast ref={toast} />
            <ResetPassForm value={value} handleClick={handleClick} onChange={handleChange} />
        </>
    );
};

const ResetPassForm = ({ value, handleClick, onChange }) => {
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor='resetPass'>New Password</label>
            <input
                type="password"
                value={value.password}  // Utilisez value.password ici
                name="resetPass"
                id='resetPass'
                onChange={onChange}
            />
            <button type="button" onClick={handleClick}>Reset Password</button>
        </form>
    );
};

export default ResetPass;
