import React, { useCallback, useRef } from "react";
import { resetPassword } from "../../../service/api";
import { Toast } from "primereact/toast";


const ResetPasswordBtn = (email) => {
    const toast = useRef(null);
    const show = () => {
        toast.current.show({severity : 'info', summary: 'info', detail : `email send to ${email}`});
    }
    const handleClick = useCallback( async ()=>{
        const response = await resetPassword(id);
        if(response.status == 'success'){
            show();
        }
    }, [])
    return (
        <>
        <Toast ref={toast}/>
        <button type="button" onClick={handleClick}>reset password</button>
        </>
    )
}

export default ResetPasswordBtn;