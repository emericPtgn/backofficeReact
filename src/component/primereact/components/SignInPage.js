import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import validatePasswords from "../user/validatePassword";
import { validateUser } from "../../../service/api";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
    const {token} = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validPassword, setValidPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [enable, setEnable] = useState(false);
    const [error, setError] = useState('');
    const toast = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const validationMessage = validatePasswords(newPassword, confirmPassword);
        setError(validationMessage);
        setEnable(validationMessage === '');
        if (validationMessage === '') {
            setValidPassword(confirmPassword);
        } else {
            setValidPassword(''); // Clear valid password if validation fails
        }
    }, [newPassword, confirmPassword]);

    const show = useCallback(() => {
        toast.current.show({severity : 'info', summary : 'info', detail : 'Utilisateur enregistré ✅'});
    }, []);

    const handleClick = async () => {
        if (enable) {
            const response = await validateUser(validPassword, token);
            if(response.status === 'success'){
                navigate('/login')
            }
        } else {
            toast.current.show({severity : 'error', summary : 'Erreur', detail : 'Veuillez corriger les erreurs avant de continuer.'});
        }
    };

    return (
        <>
            <h2>Nouvel utilisateur LIVE EVENT</h2>
            <Toast ref={toast}/>
            <div>
                <label htmlFor='password'>Saisir mot de passe</label>
                <div>
                    <InputText  
                        type={showPassword ? "text" : "password"}
                        name="password" 
                        id="password" 
                        value={newPassword} 
                        placeholder="Saisissez le mot de passe" 
                        onChange={(e) => setNewPassword(e.target.value)}/>
                    <Button 
                        icon={showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'} 
                        onClick={() => setShowPassword(!showPassword)}
                    />
                </div>
            </div>
            <div>
                <label htmlFor='confirmPassword'>Répéter mot de passe</label>
                <div>
                    <InputText  
                        type={showPassword2 ? 'text' : 'password'} 
                        name="confirmPassword" 
                        id="confirmPassword" 
                        value={confirmPassword} 
                        placeholder="Répétez le mot de passe" 
                        onChange={(e) => setConfirmPassword(e.target.value)}/>
                    <Button 
                        icon={showPassword2 ? 'pi pi-eye-slash' : 'pi pi-eye'} 
                        onClick={() => setShowPassword2(!showPassword2)}
                    />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </div>
            <button type="submit" onClick={handleClick} disabled={!enable}>Valider</button>
        </>
    )
}

export default SignInPage;
