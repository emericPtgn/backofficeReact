import '../../../App.css';
import SaveButton from '../../common/button/SaveButton';

const RightSidebar = ({ handleOnClick }) => {

    return (
        <>
            <aside className="rightSidebar">
                <div>
                    <p>Barre d'outil</p>
                    <SaveButton handleOnClick={handleOnClick}/>
                </div>
            </aside>
        </>
    )
}

export default RightSidebar;
