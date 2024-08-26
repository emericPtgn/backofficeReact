import { useRef, useState, useEffect } from "react";
import { emailResetPassword } from "../../../service/api";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import validatePasswords from "./validatePassword";
import { useParams } from "react-router-dom";
import { useUserState } from "../../../context/UserContext";

const PasswordSection = ({ setUser }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showResetLink, setShowResetLink] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const toast = useRef(null);
    const {id} = useParams();
    const state = useUserState();

    // Gestion de la visibilité du lien de réinitialisation
    useEffect(() => {
        console.log("isDataActivUserData:", state.isDataActivUserData); // Ajoutez cette ligne pour déboguer
        setShowResetLink(!state.isDataActivUserData);
    }, [state?.isDataActivUserData]);
    

    const show = () => {
        toast.current.show({ severity: 'info', summary: 'Info', detail: 'Email sent, check mailbox' });
    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        if (name === 'oldPassword') {
            setOldPassword(value);
            setUser((user) => ({ ...user, checkPassword: value }));
        } else if (name === 'newPassword') {
            setNewPassword(value);
            setUser((user) => ({ ...user, newPassword: value }));
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const response = await emailResetPassword(id);
        show();
        console.log(response);
    };

    useEffect(() => {
        const errorMessage = validatePasswords(newPassword, confirmPassword);
        setError(errorMessage);
    }, [newPassword, confirmPassword]);
    

    return (
            <div>
                <Toast ref={toast} />
                <h4>Modifier votre mot de passe</h4>
                {state?.isDataActivUserData ?  
                    <div className="d-flex flex-column">
                    <div className="p-inputgroup my-2">
                        <InputText
                            placeholder="Saisir le mot de passe actuel"
                            value={oldPassword}
                            name="oldPassword"
                            onChange={handleChange}
                            type={showOldPassword ? 'text' : 'password'}
                        />
                        <Button
                            icon={showOldPassword ? 'pi pi-eye-slash' : 'pi pi-eye'}
                            onClick={() => setShowOldPassword(!showOldPassword)}
                        />
                    </div>
                    <div className="p-inputgroup my-2">
                        <InputText
                            placeholder="Saisir le nouveau mot de passe"
                            value={newPassword}
                            name="newPassword"
                            onChange={handleChange}
                            type={showNewPassword ? 'text' : 'password'}
                        />
                        <Button
                            icon={showNewPassword ? 'pi pi-eye-slash' : 'pi pi-eye'}
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        />
                    </div>
                    <div className="p-inputgroup my-2">
                        <InputText
                            placeholder="Confirmer le nouveau mot de passe"
                            value={confirmPassword}
                            name="confirmPassword"
                            onChange={handleChange}
                            type={showConfirmPassword ? 'text' : 'password'}
                        />
                        <Button
                            icon={showConfirmPassword ? 'pi pi-eye-slash' : 'pi pi-eye'}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div> 
                    :
                    <p id="resetPass">
                    <a href="#" onClick={handleClick}>Reset password link</a>
                    </p>

                }
            </div>
    );
}

export default PasswordSection;
