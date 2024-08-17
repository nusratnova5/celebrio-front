import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SingleEvent from './SingleEvent';
import axios from 'axios';
import { RiAddLargeLine } from 'react-icons/ri';

const AllEvents = () => {
    const [events, setSEvents] = useState([]);

    useEffect(() => {
        featchEvents();
    }, []);

    const featchEvents = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`);

            setSEvents(response.data);
        } catch (error) {
            console.error('Error fetching Events:', error);
            throw error;
        }
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <div className='flex justify-between mr-32 mb-12'>
                    <h1 className='text-accent text-3xl font-bold uppercase tracking-widest'>All Events</h1>
                    <Link to={'/add-events'} className='flex justify-center items-center gap-1 px-3 py-2 text-white bg-accent tracking-widest'><RiAddLargeLine className=''/><p>Add</p></Link>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events?.map(event => (
                            <SingleEvent propEvent={event} allEvents={events} setEvents={setSEvents} key={event._id} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllEvents;