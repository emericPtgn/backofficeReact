import React, {useEffect, useState} from "react";
import ScenesMap from "./ScenesMap";
import { useUpdateEffect } from "primereact/hooks";
import MyMap from "../map/Map";

const SetScenesMap = ({scene, setScene}) => {
    const [latLng, setLatLng] = useState();
    const handleClick = (position) => {
        setLatLng(position.detail.latLng);
    }
    useEffect(()=>{
        setScene((scene) => ({...scene, position : latLng}))
    }, [latLng])

    useUpdateEffect(()=>{
        console.log(scene)
    }, [scene])
    return (
        <>
        <MyMap handleClick={handleClick}></MyMap>
        </>
    )
}

export default SetScenesMap;