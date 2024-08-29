import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updatePassWord } from "../../../service/api";
import { Toast } from "primereact/toast";
import validatePasswords from "../user/validatePassword";
import { InputText } from "primereact/inputtext";


const ResetPass = () => {
    const { token } = useParams();
    const toast = useRef(null);
    const [value, setValue] = useState({
        password: ''
    });
    const [confirmedPassword, setConfirmedPassword] = useState({
        confirmedPassword : ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const showToast = (severity, summary, detail) => {
        toast.current.show({
            severity,
            summary,
            detail,
        });
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value)
        if(name === 'password'){
            setValue((prev) => ({...prev, password: value}));
        } else if (name === 'confirmPassword')
            setConfirmedPassword((prev) => ({...prev, confirmedPassword: value}));
    };

    useEffect(()=>{
        const response = validatePasswords(value, confirmedPassword);
        setError(response);
    }, [value, confirmedPassword])

    const handleClick = async () => {
        if (error) {
            showToast('error', 'Erreur', error);
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
            <ResetPassForm value={value} confirmedPassword={confirmedPassword} handleClick={handleClick} onChange={handleChange} />
        </>
    );
};

const ResetPassForm = ({ value, confirmedPassword, handleClick, onChange }) => {
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor='resetPass'>New Password</label>
            <InputText
                type="password"
                value={value.password}  // Utilisez value.password ici
                name="password"
                id='password'
                onChange={(e) => onChange(e)}
            />
            <InputText
                type="password"
                value={confirmedPassword.confirmedPassword}  // Utilisez value.password ici
                name="confirmedPassword"
                id='confirmedPassword'
                onChange={(e) => onChange(e)}
            />
            <button type="button" onClick={handleClick}>Reset Password</button>
        </form>
    );
};

export default ResetPass;
