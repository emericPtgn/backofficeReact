import React, { useEffect, useState } from "react";
import { getEvents } from "../../../service/api";

const EventTable = () => {
    const [events, setEvents] = useState([]);
    useEffect(()=>{
        const fetchEvents = async () => {
            try {
                const data = await getEvents();
                setEvents(data);
                console.log(data);
                return data;
            } catch (error) {
                console.error('error while fetching event datas :', TypeError);
                throw error

            }
        }
        fetchEvents();
    }, [])
    return (
        <>
        <div className="container-table">
        <table className="table-level2">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">NOM</th>
                    <th scope="col">TYPE</th>
                    <th scope="col">DATE</th>
                </tr>
            </thead>
            <tbody>
                {events.map((event, index)=>{
                    <Event event={event} key={index} id={index+1} />
                })}
            </tbody>
        </table>
        </div>
        </>
    )
}

export default EventTable;

const Event = ({event, id}) => {
    return (
        <>
        <tr>
            <td hidden dataset={event.id}></td>
            <td>{id}</td>
            <td>{event.name ? event.name : ''}</td>
            <td>{event.type ? event.type : ''}</td>
            <td>{event.date ? event.date : ''}</td>
            <td>
                <button className="btn-primary" type="button"> <a href={`/event-edit/${event.id}`}>Modifier</a> </button>   
                <button type="button">Supprimer</button>               
            </td>
        </tr>
        </>
    )
}