import axios from 'axios';
import React, { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditEvent = () => {
    const event = useLoaderData();
    const { id } = useParams(); // Get the Event ID from URL parameters


    const [title, setTitle] = useState(event.title);
    const [brand, setBrand] = useState(event.brand);
    const [price, setPrice] = useState(event.price);
    const [description, setDescription] = useState(event.description);
    const [imageUrl, setImage] = useState(event.imageUrl);

    const editEvent = (e) => {
        e.preventDefault();

        const form = e.target;

        const requestBody = {
            title: title,
            brand: brand,
            price: price,
            description: description,
            imageUrl: imageUrl,
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
                    const token = localStorage.getItem('token');        
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    };
                    const response = await axios.put(`${import.meta.env.VITE_API_URL}/events/${id}`, requestBody, config);
                    console.log('Event created successfully:', response);
                    if(response.acknowledged){
                          Swal.fire({
                            text: "Event edited successfully.",
                            icon: "success"
                        });  
                    }

                    setTitle('');
                    setBrand('');
                    setPrice('');
                    setDescription('');
                    setImage('');
                } catch (error) {
                    console.error('Error updating event:', error.response ? error.response.data : error.message);
                }
            }
        });

    }
    return (
        <div className='w-3/4'>
            <h2 className='text-3xl text-accent font-bold mb-8 uppercase tracking-widest'>Update the Event information</h2>
            <form onSubmit={editEvent}>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text font-bold">Title</span>
                    </div>
                    <input type="text" name='title' onChange={(e) => setTitle(e.target.value)}  defaultValue={title} placeholder="Title" className="input input-bordered rounded-none w-full" />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text font-bold">Brand</span>
                    </div>
                    <input type="text" name='brand' onChange={(e) => setBrand(e.target.value)}  defaultValue={brand} placeholder="Brand" className="input input-bordered rounded-none w-full" />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text font-bold">Price</span>
                    </div>
                    <input type="text" name='price' onChange={(e) => setPrice(e.target.value)}  defaultValue={price} placeholder="Price" className="input input-bordered rounded-none w-full" />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text font-bold">Description</span>
                    </div>
                    <input type="text" name='description' onChange={(e) => setDescription(e.target.value)}  defaultValue={description} placeholder="Description" className="input input-bordered rounded-none w-full" />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text font-bold">Image Url</span>
                    </div>
                    <input type="text" name='imageUrl' onChange={(e) => setImage(e.target.value)}  defaultValue={imageUrl} placeholder="Image Url" className="input input-bordered rounded-none w-full" />
                </label>

                <div>
                <button type='submit' className="btn bg-accent rounded-none uppercase tracking-widest mt-5 text-white text-xl">Update</button>
                </div>
            </form>
        </div>
    );
};

export default EditEvent;