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
    const [showEditModal, setEditShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [modalId, setModalId] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        fetchEvents();
    }, [category]);

    useEffect(() => {
        if (showEditModal) {
            document.getElementById(modalId).showModal();
        }
        if (showViewModal) {
            document.getElementById(modalId).showModal();
        }
    }, [showEditModal, showViewModal])

    const fetchEvents = async () => {
        try {
            let query = {};
            if (category) {
                query.category = category;
            }
            const response = await getAllEvents(query);
            console.log(response);

            setSEvents(response);
        } catch (error) {
            console.error('Error fetching Events:', error);
            throw error;
        }
    }

    const openViewModal = (event, modalId) => {
        setEditShowModal(false);
        setSelectedEvent(event);
        setShowViewModal(true);
        setModalId(modalId);
        console.log(modalId);
    }
    const openEditModal = (event, modalId) => {
        setShowViewModal(false);
        setSelectedEvent(event);
        setEditShowModal(true);
        setModalId(modalId);
        console.log(modalId);
        console.log(event);
    }
    const closeEditModal = (id) => {
        fetchEvents();
        document.getElementById(id).close();
        setSelectedEvent({});
        setEditShowModal(false);
        setShowViewModal(false);
        setModalId('');
    }
    return (
        <div>
            <div>
                <div className='flex justify-end mb-3'>
                    <select onChange={(e) => setCategory(e.target.value)} className="select select-bordered w-full max-w-xs">
                        <option value=''>Select Category</option>
                        <option>Personal</option>
                        <option>Work</option>
                    </select>
                </div>
                <div className='flex justify-between mb-4'>
                    <h1 className='text-accent text-3xl font-bold uppercase tracking-widest'>All Events</h1>
                    <button type='button' onClick={() => document.getElementById('addModal').showModal()} className='btn flex justify-center items-center gap-1 px-3 py-2 text-white bg-accent tracking-widest'><RiAddLargeLine className='' /><p>Add</p></button>
                </div>
                <div className='overflow-x-auto'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Start Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events?.map(event => (
                                <SingleEvent openEditModal={openEditModal} openViewModal={openViewModal} propEvent={event} allEvents={events} setEvents={setSEvents} key={event._id} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <AddEventModal featchEvents={fetchEvents} />
            {showEditModal && <EditEventModal event={selectedEvent} closeEditModal={closeEditModal} />}
            {showViewModal && <ViewEventModal openEditModal={openEditModal} event={selectedEvent} closeEditModal={closeEditModal} />}
        </div>
    );
};

export default AllEvents;