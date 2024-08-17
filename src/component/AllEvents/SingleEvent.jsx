import axios from 'axios';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const SingleEvents = ({ propEvent, setEvents, allEvents }) => {
    const handleDelete = () => {
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
                    const token = localStorage.getItem('token');        
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    };
                    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/Events/${propProduct._id}`, config);
                    console.log('Product deleted successfully:', response);
                    if (response.data.acknowledged) {
                        Swal.fire({
                            text: "Product deleted successfully.",
                            icon: "success"
                        });
                        const remainingProduct = allEvents.filter(singleProduct => singleProduct._id != propProduct._id);
                        setEvents(remainingProduct);
                    }

                } catch (error) {
                    console.error('Error deleting product:', error.response ? error.response.data : error.message);
                }

            }
        });
    }
    return (
        <tr>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={propProduct?.imageUrl} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                </div>
            </td>
            <td>{propProduct?.title}</td>
            <td>{propProduct?.brand}</td>
            <th>{propProduct?.price}</th>
            <th>{propProduct?.status == 1 ? 'Not sold' : 'Sold'}</th>
            <td>
                <button onClick={handleDelete} className="btn btn-sm btn-error rounded-none  text-white mr-2">Delete</button>
                <Link to={`/dashboard/edit-product/${propProduct._id}`} className="btn btn-sm px-5 rounded-none bg-accent text-white mr-2">Edit</Link>
            </td>
        </tr>

    );
};

export default SingleEvents;