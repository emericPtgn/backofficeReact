// composant formUser
// données : user
// provenance directe des données : contexte
import EmailSection from "./EmailSection";
import RolesSection from "./RolesSection";
import PasswordSection from "./PasswordSection";
        
    
const UserForm2 = ({ user, setUser  }) => {

    return (
        <div className="form-user">
            <EmailSection user={user} setUser={setUser}  />
            <RolesSection user={user} setUser={setUser} />
            <PasswordSection setUser={setUser}/>
        </div>
    )
}

export default UserForm2;
