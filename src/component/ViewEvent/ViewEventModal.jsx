import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { deleteEvent, editEvent, getEventDetails } from '../../indexedDB';

const ViewEventModal = ({ event, closeEditModal, openEditModal, fetchEvents }) => {
    const [newEvent, setNewEditEvent] = useState({});

    useEffect(() => {
        fetchEvent()
    }, [event]);

    const fetchEvent = async() => {
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
                    <div className='flex items-center justify-between'>
                        <h3 class="font-bold text-lg">View Events</h3>
                        <button type='button' onClick={() => closeEditModal('viewModal')} class="btn btn-sm btn-circle btn-ghost">✕</button>
                    </div>
                    <div>
                        <button type='button' onClick={() => openEditModal(event, 'editModal')}>Edit</button>
                        <button type='button' onClick={handleDelete}>Delete</button>
                    </div>
                    <form>
                        <label className="form-control w-full mb-3">
                            <div className="label">
                                <span className="label-text font-bold">Title</span>
                            </div>
                            <input type="text" name='title' defaultValue={event?.title} placeholder="Title" className="input input-bordered w-full rounded-none" />
                        </label>
                        <label className="form-control w-full mb-3">
                            <div className="label">
                                <span className="label-text font-bold">category</span>
                            </div>
                            <input type="text" name='category' defaultValue={event?.category} placeholder="category" className="input input-bordered w-full rounded-none" />
                        </label>
                        <label className="form-control w-full mb-3">
                            <div className="label">
                                <span className="label-text font-bold">Start Date & Time</span>
                            </div>
                            <input type="datetime-local" name='start' defaultValue={event?.start} placeholder="date" className="input input-bordered w-full rounded-none" />
                        </label>
                        <label className="form-control w-full mb-3">
                            <div className="label">
                                <span className="label-text font-bold">End Date & Time</span>
                            </div>
                            <input type="datetime-local" name='end' defaultValue={event?.end} placeholder="date" className="input input-bordered w-full rounded-none" />
                        </label>
                        <label className="form-control w-full mb-3">
                            <div className="label">
                                <span className="label-text font-bold">Description</span>
                            </div>
                            <input type="text" name='description' defaultValue={event?.description} placeholder="Description" className="input input-bordered w-full rounded-none" />
                        </label>
                        <label className="form-control w-full mb-3">
                            <div className="label">
                                <span className="label-text font-bold">Image Url</span>
                            </div>
                            <input type="text" name='imageUrl' defaultValue={event?.imageUrl} placeholder="Image Url" className="input input-bordered w-full rounded-none" />
                        </label>
                        <label className="form-control w-full mb-3">
                            <div className="label">
                                <span className="label-text font-bold">Location</span>
                            </div>
                            <textarea type="text" name='location' defaultValue={event?.location} placeholder="Image Url" className="input input-bordered w-full rounded-none" />
                        </label>

                        <div>
                            <button type='submit' className="btn bg-accent rounded-none uppercase mt-5 text-white text-xl tracking-widest">Update</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default ViewEventModal;