import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Swal from 'sweetalert2';
import { auth } from '../../Firebase/Firebase.config';

const AddEvents = () => {
    const [user] = useAuthState(auth);
    const addEvents = (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const category = form.category.value;
        const date = form.date.value;
        const description = form.description.value;
        const imageUrl = form.imageUrl.value;
        const location = form.location.value;

        const requestBody = {
            title: title,
            category: category,
            date: date,
            description: description,
            imageUrl: imageUrl,
            location: location,
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Add"
        }).then(async (result)  =>  {
            if (result.isConfirmed) {
                try {
                    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/events`, requestBody);
                    console.log('Event created successfully:', response);
                    if (response.data.acknowledged) {
                        Swal.fire({
                            text: "Event added successfully.",
                            icon: "success"
                        });
                    }
                } catch (error) {
                    console.error('Error creating user:', error.response ? error.response.data : error.message);
                }
                   
            }
        });

    }
    return (
        <div className=''>
            <h2 className='text-3xl text-accent font-bold mb-8 uppercase tracking-widest'>Add a new Event</h2>
            <form onSubmit={addEvents}>
                <label className="form-control w-full mb-3">
                    <div className="label">
                        <span className="label-text font-bold">Title</span>
                    </div>
                    <input type="text" name='title' placeholder="Title" className="input input-bordered w-full rounded-none" />
                </label>
                <label className="form-control w-full mb-3">
                    <div className="label">
                        <span className="label-text font-bold">category</span>
                    </div>
                    <input type="text" name='category' placeholder="category" className="input input-bordered w-full rounded-none" />
                </label>
                <label className="form-control w-full mb-3">
                    <div className="label">
                        <span className="label-text font-bold">date</span>
                    </div>
                    <input type="text" name='date' placeholder="date" className="input input-bordered w-full rounded-none" />
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
    );
};

export default AddEvents;