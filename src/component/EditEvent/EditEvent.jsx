import axios from 'axios';
import React, { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditEvent = () => {
    const event = useLoaderData();
    const { id } = useParams(); // Get the Event ID from URL parameters

    const editEvent = (e) => {
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
            confirmButtonText: "Edit"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/events/${id}`, requestBody);
                    console.log('Event created successfully:', response);
                    if(response){
                          Swal.fire({
                            text: "Event edited successfully.",
                            icon: "success"
                        });  
                    }
                } catch (error) {
                    console.error('Error updating event:', error.response ? error.response.data : error.message);
                }
            }
        });

    }
    return (
        <div className=''>
            <h2 className='text-3xl text-accent font-bold mb-8 uppercase tracking-widest'>Add a new Event</h2>
            <form onSubmit={editEvent}>
                <label className="form-control w-full mb-3">
                    <div className="label">
                        <span className="label-text font-bold">Title</span>
                    </div>
                    <input type="text" name='title'defaultValue={event?.title} placeholder="Title" className="input input-bordered w-full rounded-none" />
                </label>
                <label className="form-control w-full mb-3">
                    <div className="label">
                        <span className="label-text font-bold">category</span>
                    </div>
                    <input type="text" name='category' defaultValue={event?.category} placeholder="category" className="input input-bordered w-full rounded-none" />
                </label>
                <label className="form-control w-full mb-3">
                    <div className="label">
                        <span className="label-text font-bold">date</span>
                    </div>
                    <input type="text" name='date' defaultValue={event?.date} placeholder="date" className="input input-bordered w-full rounded-none" />
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
    );
};

export default EditEvent;