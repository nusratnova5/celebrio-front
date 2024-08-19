import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale'; // Use named import for locale
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import styles

// Import your getAllEvents function
import { getAllEvents } from '../../indexedDB';
import AddEventModal from '../AddEvents/AddEventModal';
import EditEventModal from '../EditEvent/EditEventModal';
import ViewEventModal from '../ViewEvent/ViewEventModal';

// Setup the localizer for date-fns
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date()),
    getDay,
    locales: {
        'en-US': enUS, // Use imported locale
    },
});

const Dashboard = () => {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [showEditModal, setEditShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [modalId, setModalId] = useState('');

    useEffect(() => {
        if (showEditModal) {
            document.getElementById(modalId).showModal();           
        }
        if (showViewModal) {
            document.getElementById(modalId).showModal();           
        }
    }, [showEditModal, showViewModal])

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await getAllEvents();
            console.log('Fetched events:', response);

            // Assuming response is an array of events
            setEvents(response.map(event => ({
                id: event.id,
                title: event.title,
                start: new Date(event.start),
                end: new Date(event.end)
            })));
        } catch (error) {
            console.error('Error fetching events:', error);
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

    // Handle date changes (for showing detailed events on a specific date)
    const handleDateChange = (date) => {
        setDate(date);
    };

    const handleEventClick = (event) => {
        openViewModal(event, 'viewModal')
    };
    const handleDateClick = (date) => {
        document.getElementById('addModal').showModal();
    };
        

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100vh' }}
                views={['month', 'week', 'day']}
                onSelectEvent={handleEventClick}
                onSelectSlot={handleDateClick}
                selectable
                onView={view => console.log('View changed to:', view)}
            />
            <AddEventModal featchEvents={fetchEvents} />
            {showEditModal && <EditEventModal event={selectedEvent} closeEditModal={closeEditModal} />}
            {showViewModal && <ViewEventModal openEditModal={openEditModal} event={selectedEvent} closeEditModal={closeEditModal} fetchEvents={fetchEvents} />}
        </div>
    );
};

export default Dashboard;
