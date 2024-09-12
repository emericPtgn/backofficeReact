import React from "react";
import { useState } from "react";

const useUserHooks = () => {

    const checkIsUserAdmin = (activUser) => {
        return activUser?.roles[0] === 'ROLE_ADMIN' ? true : false;
    }
    
    return {checkIsUserAdmin}
}

export default useUserHooks;