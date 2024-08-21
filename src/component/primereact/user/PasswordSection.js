import { useRef, useState, useEffect } from "react";
import { Password } from "primereact/password";
import { emailResetPassword } from "../../../service/api";
import { Toast } from "primereact/toast";

const PasswordSection = ({ id, isActivUserProfil }) => {
    const [value, setValue] = useState('');
    const [showResetLink, setShowResetLink] = useState(false);
    const toast = useRef(null);

    // This useEffect ensures that the reset link is hidden if the user is not viewing their own profile
    useEffect(() => {
        if (isActivUserProfil) {
            setShowResetLink(false);
        } else {
            setShowResetLink(true);
        }
    }, [isActivUserProfil]);

    const show = () => {
        toast.current.show({ severity: 'info', summary: 'Info', detail: 'Email sent, check mailbox' });
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const response = await emailResetPassword(id);
        show();
        setShowResetLink(false);  // Hide the reset link after the email is sent
        console.log(response);
    };

    return (
        <div className="card flex justify-content-center">
            <Toast ref={toast} />
            {showResetLink ?  
                <p id="resetPass">
                    <a href="#" onClick={handleClick}>Reset password link</a>
                </p>
                : 
                <Password value={value} onChange={(e) => setValue(e.target.value)} />
            }
        </div>
    );
}

export default PasswordSection;
