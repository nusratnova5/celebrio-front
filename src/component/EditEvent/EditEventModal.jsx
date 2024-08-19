import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { editEvent, getEventDetails } from '../../indexedDB';

const EditEventModal = ({event, closeEditModal}) => {
    const [newEvent, setNewEditEvent] = useState({});
    console.log(newEvent);
    useEffect(() => {
        fetchEvent()
    }, [event]);

    const fetchEvent = async() => {
        const response = await getEventDetails(event.id);
        setNewEditEvent(response)
    }

    const handleEditEvent = async (e) => {
        console.log(e.target);
        e.preventDefault();

        const form = e.target;
        const title = form.title.value;
        const category = form.category.value;
        const start = form.start.value;
        const end = form.end.value;
        const description = form.description.value;
        const imageUrl = form.imageUrl.value;
        const location = form.location.value;

        const requestBody = {
            id: newEvent.id,
            title: title,
            category: category,
            start: start,
            end: end,
            description: description,
            imageUrl: imageUrl,
            location: location,
        }
        
        try {
            // const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/events/${id}`, requestBody);
            const response = await editEvent(requestBody);
            console.log('Event created successfully:', response);
            if (response) {
                closeEditModal('editModal');
                Swal.fire({
                    text: "Event edited successfully.",
                    icon: "success"
                });
            }
        } catch (error) {
            console.error('Error updating event:', error.response ? error.response.data : error.message);
        }
    }
    return (
        <div>
            <dialog id="editModal" className="modal">
                <div className="modal-box">
                    <div className='flex items-center justify-between'>
                        <h3 class="font-bold text-lg">Edit Event</h3>
                        <button type='button' onClick={() => closeEditModal('editModal')} class="btn btn-sm btn-circle btn-ghost">✕</button>
                    </div>
                    <form onSubmit={handleEditEvent}>
                        <label className="form-control w-full mb-3">
                            <div className="label">
                                <span className="label-text font-bold">Title</span>
                            </div>
                            <input type="text" name='title' defaultValue={newEvent?.title} placeholder="Title" className="input input-bordered w-full rounded-none" />
                        </label>
                        <label className="form-control w-full mb-3">
                            <div className="label">
                                <span className="label-text font-bold">Category</span>
                            </div>
                            <select name='category' className="select select-bordered w-full">
                                <option selected={newEvent?.category === 'Personal'}>Personal</option>
                                <option selected={newEvent?.category === 'Work'}>Work</option>
                            </select>
                        </label>
                        <label className="form-control w-full mb-3">
                            <div className="label">
                                <span className="label-text font-bold">Start Date & Time</span>
                            </div>
                            <input type="datetime-local" name='start' defaultValue={newEvent?.start} placeholder="date" className="input input-bordered w-full rounded-none" />
                        </label>
                        <label className="form-control w-full mb-3">
                            <div className="label">
                                <span className="label-text font-bold">End Date & Time</span>
                            </div>
                            <input type="datetime-local" name='end' defaultValue={newEvent?.end} placeholder="date" className="input input-bordered w-full rounded-none" />
                        </label>
                        <label className="form-control w-full mb-3">
                            <div className="label">
                                <span className="label-text font-bold">Description</span>
                            </div>
                            <input type="text" name='description' defaultValue={newEvent?.description} placeholder="Description" className="input input-bordered w-full rounded-none" />
                        </label>
                        <label className="form-control w-full mb-3">
                            <div className="label">
                                <span className="label-text font-bold">Image Url</span>
                            </div>
                            <input type="text" name='imageUrl' defaultValue={newEvent?.imageUrl} placeholder="Image Url" className="input input-bordered w-full rounded-none" />
                        </label>
                        <label className="form-control w-full mb-3">
                            <div className="label">
                                <span className="label-text font-bold">Location</span>
                            </div>
                            <textarea type="text" name='location' defaultValue={newEvent?.location} placeholder="Image Url" className="input input-bordered w-full rounded-none" />
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

export default EditEventModal;