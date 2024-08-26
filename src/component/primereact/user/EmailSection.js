import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { useUserState } from "../../../context/UserContext";

const EmailSection = ({ user, setUser }) => {
    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // État pour le message de validation
    const { users } = useUserState();


    const handleChange = (e) => {
        const emailValue = e.target.value;
        setValue(emailValue);

        // Retirer l'erreur uniquement si l'input est vide ou si la validation est correcte
        if (emailValue.length === 0) {
            setErrorMessage('');
            setSuccessMessage('');
            return;
        }

        if (validateEmailFormat(emailValue) && validationUniqueEmail(emailValue)) {
            setSuccessMessage('Email validé avec succès.');
            setErrorMessage('');
            setUser((prevUser) => ({ ...prevUser, newMail: emailValue }));
        } else if (validateEmailFormat(emailValue) && !validationUniqueEmail(emailValue)) {
            setErrorMessage('Cet email existe déjà.');
            setSuccessMessage('');
        } else if (errorMessage === 'Format d\'email invalide.') {
            setErrorMessage('Format d\'email invalide.');
            setSuccessMessage('');
        }
    };

    const handleBlur = () => {
        const emailValue = value;

        if (emailValue.length === 0) {
            setErrorMessage('');
            setSuccessMessage('');
            return;
        }

        if (!validateEmailFormat(emailValue)) {
            setErrorMessage('Format d\'email invalide.');
            setSuccessMessage('');
            return;
        }

        if (!validationUniqueEmail(emailValue)) {
            setErrorMessage('Cet email existe déjà.');
            setSuccessMessage('');
            return;
        }

        setSuccessMessage('Email validé avec succès.');
    };

    const validateEmailFormat = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    const validationUniqueEmail = (value) => {
        return !users.find(user => user.email === value);
    };

    return (
        <div>
            <div>
                <h4>Email</h4>
                {user?.email ? <p className="mt-3">Adresse e-mail actuelle : {user?.email}</p> : ''}
            </div>
            <div className="d-flex flex-column">
                <InputText
                    placeholder="Saisir la nouvelle adresse e-mail"
                    name="email"
                    type="email"
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            </div>
        </div>
    );
};

export default EmailSection;
