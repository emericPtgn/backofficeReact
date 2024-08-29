import React from "react";
import LocalCalendar from "../components/CalendarLocal";
import { SelectTypeActivity } from "../components/SelectTypeActivity";
import SelectLocation from "../components/SelectLocation";
import { NameField } from "../components/NameField";
import { AutoComplet } from "../components/AutoComplet";
import DeleteButton2 from '../../common/button/DeleteButton2'

export const ActiviteForm2 = ({ activity, onChange, index, activities }) => {

    if (!activity || !activities) {
        return null;
    }
    
    const handleLocalChange = (field, value) => {
        const dateValue = field === 'date' ? new Date(value).toISOString() : value;
        onChange({ target: { name: `activite_${field}_${index}`, value: dateValue } });
    };

    const handleDeleteField = () => {
        onChange({ target: { name: 'deleteField', value: index } });
    };

    let artistesNamesArray = [];
    let artistesIdsArray = [];
    
    if(activity.artistesNames && activity.artistesIds){
        artistesNamesArray = activity.artistesNames.split(',');
        artistesIdsArray = activity.artistesIds.split(',');
    }

    const generateArtistLink = (itemId) => {
        const currentUrl = window.location.origin;
        // Créez l'URL en utilisant le chemin correct
        return `${currentUrl}/artiste-edit/${itemId.trim()}`;
    };
    
    const artistLinks = artistesNamesArray.map((itemName, i) => {
        const itemId = artistesIdsArray[i];
        return (
            <React.Fragment key={itemId.trim()}>
                {i > 0 && ", "}
                <a href={generateArtistLink(itemId)}>
                    {itemName.trim()}
                </a>
            </React.Fragment>
        );
    });
    

    return (
        <>
            <div className="form-activity">
                <div className="form-activity-p1">
                    <div>
                        <h4 className="text-2xl font-bold mb-0 me-3">Activite {index + 1}</h4>
                        <span className="info_nb_artist">
                            Participants : {artistLinks.length > 0 ? artistLinks : "Aucun"}
                        </span>
                    </div>
                    <DeleteButton2 tooltip='Supprimer activité'  onClick={handleDeleteField}/>
                </div>
                <div className="form-activity-p2">
                    <div>
                        
                    </div>
                    <div className="form-activity-p2-2cols">
                        {/* <NameField name='nom' value={activity.nom} onChange={(e) => handleLocalChange(e.target.name, e.target.value)} /> */}
                        <AutoComplet name='nom' value={activity.nom} activities={activities} onChange={(value, name) => handleLocalChange(name, value)} />
                        <SelectTypeActivity name='type' value={activity.type} onChange={(value, name) => handleLocalChange(name, value)} />
                        <LocalCalendar name='date' value={activity.date} onChange={(value, name) => handleLocalChange(name, value)} />
                    </div>
                    <div>
                        <SelectLocation name='location' typeActivity={activity.type} activity={activity} onChange={(value, name) => handleLocalChange(name, value)} />    
                    </div>
                </div>
            </div>
        </>
    );
};
