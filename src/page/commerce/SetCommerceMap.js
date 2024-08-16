import MyMap from "../map/Map";
import React from "react";
import { useState } from "react";



const SetCommerceMap = () => {

    const [latLng, setLatLng] = useState();
    return (
        <>
        <MyMap />
        </>
    )
}


export default SetCommerceMap;