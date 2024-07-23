import React from "react";

const AddFile = () => {
    return (
        <>
            <form>
                <label for='myfile'>Choisir un fichier</label>
                <input type="file" id="myfile" name="myfile"/>
                <input type="submit" value="Submit"/>
            </form>
        </>
    )
}

export default AddFile;