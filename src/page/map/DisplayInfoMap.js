const DisplayInfosMap = ({ marker }) => {
  
    let isPlaced = marker?.latitude && marker?.longitude ? 'oui' : 'non';
    return (
      <>
        <div>
          <p> Icone {marker?.nom} : <span>{marker?.icone}</span> </p>
          <p> Marker placé : <span>{isPlaced}</span> </p>
        </div>
      </>
    );
};

export default DisplayInfosMap;