import { useState, useEffect } from "react";
import { RadioButton } from "primereact/radiobutton";
import { Tooltip } from "primereact/tooltip";
import { useUserState } from "../../../context/UserContext";
import { useParams } from "react-router-dom";

const RolesSection = ({ user, setUser }) => {
    const [selectedRole, setSelectedRole] = useState(user?.roles || null);
    const [enable, setEnable] = useState(false);
    const [nbAdmin, setNbAdmin] = useState(0);
    const [infoMessage, setInfoMessage] = useState('');
    const state = useUserState();
    const { id } = useParams();

    useEffect(() => {
        const adminUsers = state?.users?.filter(u => u?.roles?.includes('ROLE_ADMIN'));
        setNbAdmin(adminUsers.length);
    }, [state?.users]);

    useEffect(() => {
        if (state?.isAdmin) {
            if (state?.isDataActivUserData && nbAdmin <= 1) {
                setEnable(false);
                setInfoMessage(`${user.email} est le seul admin. Nommez un autre admin.`);
            } else {
                setEnable(true);
                setInfoMessage('');
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
        setUser((user) => ({ ...user, roles: [newRole] }));
    };

    const roles = [
        { name: 'ROLE_ADMIN', key: 'ROLE_ADMIN' },
        { name: 'ROLE_EDITEUR', key: 'ROLE_EDITEUR' },
        { name: 'ROLE_AUTEUR', key: 'ROLE_AUTEUR' },
        { name: 'ROLE_CONTRIBUTEUR', key: 'ROLE_CONTRIBUTEUR' },
        { name: 'ROLE_USER', key: 'ROLE_USER' },
    ];

    return (
        <div className="flex flex-column gap-3 roles-section">
            <h4>Rôle</h4>
            <p>Rôle actuel : {user?.roles}</p>
            {roles.map((role) => (
                <div key={role.key} className="d-flex align-items-center role-container">
                    <div className="role-tooltip-container" id={`role-tooltip-${role.key}`}>
                        <RadioButton
                            inputId={role.key}
                            name="role"
                            value={role.key}
                            onChange={handleChange}
                            checked={selectedRole === role.key}
                            disabled={!enable}
                        />
                    </div>
                    <label htmlFor={role.key} className="ml-2">
                        {role.name}
                    </label>
                    {!enable && (
                        <Tooltip target={`#role-tooltip-${role.key}`} content={infoMessage} position="right" />
                    )}
                </div>
            ))}
        </div>
    );
};

export default RolesSection;
