import { useState, useEffect } from "react";
import { RadioButton } from "primereact/radiobutton";
import { useUserState } from "../../../context/UserContext";

const RolesSection = ({ user, setUser, isActivUserAdmin, isActivUserProfil }) => {
    const [selectedRole, setSelectedRole] = useState(user?.roles[0] || null);
    const [enable, setEnable] = useState(false);
    const [nbAdmin, setNbAdmin] = useState(0);
    const [msgEnable, setMsgEnable] = useState('');
    const [infoMessage, setInfoMessage] = useState(''); // Pour le message d'information
    const state = useUserState();

    useEffect(() => {
        const adminUsers = state.users.filter(u => u.roles.includes('ROLE_ADMIN'));
        setNbAdmin(adminUsers.length);
    }, [state.users]);

    useEffect(() => {
        if (isActivUserAdmin) {
            if (isActivUserProfil && nbAdmin <= 1) {
                setEnable(false);
            } else {
                setEnable(true);
                setMsgEnable('');
            }
        } else {
            setEnable(false);
        }
    }, [isActivUserAdmin, isActivUserProfil, nbAdmin]);

    useEffect(() => {
        setSelectedRole(user?.roles[0] || null);
    }, [user?.roles]);

    const handleChange = (e) => {
        const newRole = e.target.value;
        setSelectedRole(newRole);
        setUser((user) => ({ ...user, roles: [newRole] }));
    };

    const handleClick = (e) => {
        if (isActivUserAdmin && isActivUserProfil && nbAdmin <= 1) {
            setInfoMessage(`${user.email} est le seul admin. Nommez un autre admin`);
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
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-3">
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
        </div>
    );
};

export default RolesSection;
