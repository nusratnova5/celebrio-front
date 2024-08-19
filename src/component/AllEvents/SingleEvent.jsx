import axios from 'axios';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteEvent } from '../../indexedDB';

const SingleEvents = ({ propEvent, setEvents, allEvents, openEditModal }) => {
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
                    // const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/events/${propEvent.id}`);
                    const response = await deleteEvent(propEvent.id);
                    console.log('Event deleted successfully:', response);
                    if (response.acknowledged) {
                        Swal.fire({
                            text: "Event deleted successfully.",
                            icon: "success"
                        });
                        const remainingEvent = allEvents.filter(singleEvent => singleEvent.id != propEvent.id);
                        setEvents(remainingEvent);
                    }

                } catch (error) {
                    console.error('Error deleting Event:', error.response ? error.response.data : error.message);
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
                            <img src={propEvent?.imageUrl} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                </div>
            </td>
            <td>{propEvent?.name}</td>
            <td>{propEvent?.category}</td>
            <th>{propEvent?.date}</th>
            <td>
                <button onClick={handleDelete} className="btn btn-sm btn-error rounded-none  text-white mr-2">Delete</button>
                {/* <Link to={`/edit-event/${propEvent.id}`} className="btn btn-sm px-5 rounded-none bg-accent text-white mr-2">Edit</Link> */}
                <button type='button' onClick={() => openEditModal(propEvent, 'editModal')} className="btn btn-sm px-5 rounded-none bg-accent text-white mr-2">Edit</button>
                <button type='button' onClick={() => openEditModal(propEvent, 'viewModal')} className="btn btn-sm px-5 rounded-none bg-accent text-white mr-2">View</button>
            </td>
        </tr>

    );
};

export default SingleEvents;