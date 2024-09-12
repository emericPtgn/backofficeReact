import { InputText } from "primereact/inputtext";

const DisplayInfosMap = ({ marker, onDeleteMarker }) => {
    let isPlaced = marker?.latitude && marker?.longitude ? 'oui' : 'non';
    return (
      <div className="info-marker">
        <p style={{marginBottom: 0}}> Icone : <span>{marker?.icone}</span> </p>
        <p style={{marginBottom: 0}}> Marker placé : <span>{isPlaced}</span> </p>
        <p onClick={onDeleteMarker}> supprimer marker </p>
      </div>
    );
};

export default DisplayInfosMap;
