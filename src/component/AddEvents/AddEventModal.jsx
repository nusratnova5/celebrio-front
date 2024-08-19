import React from 'react';
import { addEvent } from '../../indexedDB';
import Swal from 'sweetalert2';

const AddEventModal = ({ featchEvents }) => {
    const addEvents = async (e) => {
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
            title: title,
            category: category,
            start: start,
            end: end,
            description: description,
            imageUrl: imageUrl,
            location: location,
        }

        try {
            // const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/events`, requestBody);
            const response = await addEvent(requestBody);
            console.log('Event created successfully:', response);
            if (response.acknowledged) {
                document.getElementById('addModal').close();
                featchEvents()
                Swal.fire({
                    text: "Event added successfully.",
                    icon: "success"
                });
            }
        } catch (error) {
            console.error('Error creating user:', error.response ? error.response.data : error.message);
        }

    }
    return (
        <div>
            <dialog id="addModal" className="modal">
                <div className="modal-box">
                    <div className='flex items-center justify-between'>
                        <h3 class="font-bold text-lg">Add Events</h3>
                        <form method="dialog"><button class="btn btn-sm btn-circle btn-ghost">✕</button></form>
                    </div>
                    <form onSubmit={addEvents}>
                        <label className="form-control w-full mb-3">
                            <div className="label">
                                <span className="label-text font-bold">Title</span>
                            </div>
                            <input type="text" name='title' placeholder="Title" className="input input-bordered w-full rounded-none" />
                        </label>
                        <label className="form-control w-full mb-3">
                            <div className="label">
                                <span className="label-text font-bold">Category</span>
                            </div>
                            <select name='category' className="select select-bordered w-full">
                                <option>Personal</option>
                                <option>Work</option>
                            </select>
                        </label>
                        <label className="form-control w-full mb-3">
                            <div className="label">
                                <span className="label-text font-bold">Start Date & Time</span>
                            </div>
                            <input type="datetime-local" name='start' placeholder="date" className="input input-bordered w-full rounded-none" />
                        </label>
                        <label className="form-control w-full mb-3">
                            <div className="label">
                                <span className="label-text font-bold">End Date & Time</span>
                            </div>
                            <input type="datetime-local" name='end' placeholder="date" className="input input-bordered w-full rounded-none" />
                        </label>
                        <label className="form-control w-full mb-3">
                            <div className="label">
                                <span className="label-text font-bold">Description</span>
                            </div>
                            <input type="text" name='description' placeholder="Description" className="input input-bordered w-full rounded-none" />
                        </label>
                        <label className="form-control w-full mb-3">
                            <div className="label">
                                <span className="label-text font-bold">Image Url</span>
                            </div>
                            <input type="text" name='imageUrl' placeholder="Image Url" className="input input-bordered w-full rounded-none" />
                        </label>
                        <label className="form-control w-full mb-3">
                            <div className="label">
                                <span className="label-text font-bold">Location</span>
                            </div>
                            <textarea type="text" name='location' placeholder="Image Url" className="input input-bordered w-full rounded-none" />
                        </label>

                        <div>
                            <button type='submit' className="btn bg-accent rounded-none uppercase mt-5 text-white text-xl tracking-widest">Add</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default AddEventModal;