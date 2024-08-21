// composant formUser
// données : user
// provenance directe des données : contexte
import EmailSection from "./EmailSection";
import RolesSection from "./RolesSection";
import PasswordSection from "./PasswordSection";
        
    
const UserForm2 = ({ id, user, setUser, isActivUserAdmin, isDatasFromAdminUser }) => {
    let isActivUserProfil = isDatasFromAdminUser ? true : isActivUserAdmin ? false : true;
    return (
        <>
        <h2>User consulte sa propre fiche : {isActivUserProfil.toString()}</h2>
            <form>
                <EmailSection user={user} setUser={setUser} />
                <RolesSection user={user} setUser={setUser} isActivUserAdmin={isActivUserAdmin} isActivUserProfil={isActivUserProfil} />
                <PasswordSection isActivUserAdmin={isActivUserAdmin} isActivUserProfil={isActivUserProfil} id={id} />
            </form>
        </>
    )
}

export default UserForm2;
