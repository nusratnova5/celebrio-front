import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SingleEvent from './SingleEvent';
import axios from 'axios';
import { RiAddLargeLine } from 'react-icons/ri';
import { getAllEvents } from '../../indexedDB';
import AddEventModal from '../AddEvents/AddEventModal';
import EditEventModal from '../EditEvent/EditEventModal';
import ViewEventModal from '../ViewEvent/ViewEventModal';

const AllEvents = () => {
    const [events, setSEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [modalId, setModalId] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        featchEvents();
    }, []);

    useEffect(() => {
        console.log(showModal);
        if (showModal) {
            document.getElementById(modalId).showModal();           
        }
    }, [showModal])

    const featchEvents = async () => {
        try {
            // const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`);
            const response = await getAllEvents();
            console.log(response);

            setSEvents(response);
        } catch (error) {
            console.error('Error fetching Events:', error);
            throw error;
        }
    }

    const openEditModal = (event, modalId) => {
        setSelectedEvent(event);
        setShowModal(true);
        setModalId(modalId);
        console.log(modalId);
    }
    const closeEditModal = (id) => {
        featchEvents();
        document.getElementById(id).close();
        setSelectedEvent({});
        setShowModal(false);
        setModalId('');
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <div className='flex justify-between mr-32 mb-12'>
                    <h1 className='text-accent text-3xl font-bold uppercase tracking-widest'>All Events</h1>
                    {/* <Link to={'/add-events'} className='flex justify-center items-center gap-1 px-3 py-2 text-white bg-accent tracking-widest'><RiAddLargeLine className=''/><p>Add</p></Link> */}
                    <button type='button' onClick={() => document.getElementById('addModal').showModal()} className='flex justify-center items-center gap-1 px-3 py-2 text-white bg-accent tracking-widest'><RiAddLargeLine className=''/><p>Add</p></button>
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
                            <SingleEvent openEditModal={openEditModal} propEvent={event} allEvents={events} setEvents={setSEvents} key={event._id} />
                        ))}
                    </tbody>
                </table>
            </div>
            <AddEventModal featchEvents={featchEvents} />
            {showModal && <EditEventModal event={selectedEvent} closeEditModal={closeEditModal} />}
            {showModal && <ViewEventModal event={selectedEvent} closeEditModal={closeEditModal} />}
        </div>
    );
};

export default AllEvents;