import { useState, useEffect } from "react";
import { RadioButton } from "primereact/radiobutton";
import { useUserState } from "../../../context/UserContext";
import { useParams } from "react-router-dom";

const RolesSection = ({ user, setUser }) => {
    const [selectedRole, setSelectedRole] = useState(user?.roles || null);
    const [enable, setEnable] = useState(false);
    const [nbAdmin, setNbAdmin] = useState(0);
    const [msgEnable, setMsgEnable] = useState('');
    const [infoMessage, setInfoMessage] = useState(''); // Pour le message d'information
    const state = useUserState();
    const {id} = useParams();

    useEffect(() => {
        const adminUsers = state?.users?.filter(u => u?.roles?.includes('ROLE_ADMIN'));
        setNbAdmin(adminUsers.length);
    }, [state?.users]);

    useEffect(() => {
        if (state?.isAdmin) {
            if (state?.isDataActivUserData && nbAdmin <= 1) {
                setEnable(false);
            } else {
                setEnable(true);
                setMsgEnable('');
            }
        } else {
            setEnable(false);
        }
    }, [state?.isAdmin, state?.isDataActivUserData, nbAdmin]);

    useEffect(() => {
        setSelectedRole(user?.roles || null);
    }, [user?.roles]);

    const handleChange = (e) => {
        const newRole = e.target.value;
        setSelectedRole(newRole);
        setUser((user) => ({ ...user, newRole: [newRole] }));
    };

    const handleClick = (e) => {
        if (state?.isAdmin && state?.isDataActivUserData && nbAdmin <= 1) {
            setInfoMessage(`${user.email} est le seul admin. Nommez un autre admin`);
            setTimeout(() => {
                setInfoMessage(''); // Efface le message après 2 secondes
            }, 3500); // 2000 millisecondes = 2 secondes
        } else {
            setInfoMessage('');
        }
    };
    
    const roles = [
        { name: 'ROLE_ADMIN', key: 'ROLE_ADMIN' },
        { name: 'ROLE_EDITEUR', key: 'ROLE_EDITEUR' },
        { name: 'ROLE_AUTEUR', key: 'ROLE_AUTEUR' },
        { name: 'ROLE_CONTRIBUTEUR', key: 'ROLE_CONTRIBUTEUR' },
        { name: 'ROLE_USER', key: 'ROLE_USER' },
    ];

    return (
            <div className="flex flex-column gap-3">
                <h4>Rôle</h4>
                <p>Rôle actuel : {user?.roles}</p>
                {roles.map((role) => (
                    <div key={role.key} className="flex align-items-center" onClick={handleClick}>
                        <RadioButton
                            inputId={role.key}
                            name="role"
                            value={role.key}
                            onChange={handleChange}
                            checked={selectedRole === role.key}
                            disabled={!enable}
                        />
                        <label htmlFor={role.key} className="ml-2">
                            {role.name}
                        </label>
                    </div>
                ))}
                {infoMessage && (
                    <p className="mt-2 text-blue-500">{infoMessage}</p>
                )}
            </div>
    );
};

export default RolesSection;
