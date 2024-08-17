import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import SingleEvent from './SingleEvent';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../Firebase/Firebase.config';
import axios from 'axios';
import { VscDiffAdded } from 'react-icons/vsc';
import { RiAddLargeLine } from 'react-icons/ri';

const AllEvents = () => {
    const [events, setSEvents] = useState([]);
    const token = localStorage.getItem('token');
    const [user] = useAuthState(auth);

    useEffect(() => {
        featchEvents();
    }, [user,token]);

    const featchEvents = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`
            };
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/Events?email=${user?.email}`, { headers });

            setSEvents(response.data);
        } catch (error) {
            console.error('Error fetching Events:', error);
            throw error; // Rethrow the error to handle it outside
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
                            <th>Title</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {events?.map(product => (
                            <SingleEvent propEvent={Event} allEvents={events} setEvents={setSEvents} key={event._id} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllEvents;