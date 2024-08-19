import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { deleteEvent, editEvent, getEventDetails } from '../../indexedDB';

const ViewEventModal = ({ event, closeEditModal, openEditModal, fetchEvents }) => {
    const [newEvent, setNewEditEvent] = useState({});

    useEffect(() => {
        fetchEvent()
    }, [event]);

    const fetchEvent = async () => {
        const response = await getEventDetails(event.id);
        setNewEditEvent(response)
    }

    const handleDelete = () => {
        closeEditModal('viewModal');
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/events/${propEvent.id}`);
                    const response = await deleteEvent(newEvent.id);
                    if (response.acknowledged) {
                        Swal.fire({
                            text: "Event deleted successfully.",
                            icon: "success"
                        });
                        fetchEvents();
                    }

                } catch (error) {
                    console.error('Error deleting Event:', error.response ? error.response.data : error.message);
                }

            }
        });
    }
    return (
        <div>
            <dialog id="viewModal" className="modal">
                <div className="modal-box">
                    <div className='flex items-center justify-between mb-3'>
                        <h3 class="font-bold text-lg">View Events</h3>
                        <div className='flex gap-2'>
                            <button type='button' onClick={() => openEditModal(event, 'editModal')} className='btn p-2 bg-green-400 hover:bg-green-500 text-white'>Edit</button>
                            <button type='button' onClick={handleDelete} className='btn p-2 bg-red-400 hover:bg-red-500 text-white'>Delete</button>
                            <button type='button' onClick={() => closeEditModal('viewModal')} class="btn btn-sm btn-circle btn-ghost">✕</button>
                        </div>
                    </div>
                    <div>
                        <div className='flex justify-center'>
                            <img className='w-full h-40 object-cover' src={newEvent?.imageUrl} alt="" />
                        </div>
                        <h1 className='text-center text-3xl'>{newEvent?.title}</h1>
                        <p><span className='font-bold'>Location:</span> {newEvent?.location}</p>
                        <p><span className='font-bold'>Category:</span> {newEvent?.category}</p>
                        <p><span className='font-bold'>Start:</span> {new Date(newEvent?.start).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} {new Date(newEvent?.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                        <p><span className='font-bold'>End:</span> {new Date(newEvent?.end).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} {new Date(newEvent?.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                        <p><span className='font-bold'>Description:</span> {newEvent?.description}</p>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ViewEventModal;