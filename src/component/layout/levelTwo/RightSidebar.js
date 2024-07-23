import '../../../App.css';
import SaveButton from '../../common/button/SaveButton';

const RightSidebar = ({handleOnClick}) => {
    // sidebar contextuelle fournit propriétés et méthodes sur métadonnés de l'objet  
    return (
        <>
            <aside className="rightSidebar">
                <h3>Right sidebar</h3>
                <p>Informations supplémentaires, options...</p>
                <div id='rsb-bloc1'>
                    <p>Modification en cours ..</p>
                    <SaveButton handleOnClick={handleOnClick}/>
                </div>


            </aside>
        </>
    )
}

export default RightSidebar