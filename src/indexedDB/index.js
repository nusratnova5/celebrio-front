import { openDB } from 'idb';

// Initialize the IndexedDB database with an events store
const initDB = async () => {
    const db = await openDB('event-database', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('events')) {
                db.createObjectStore('events', { keyPath: 'id', autoIncrement: true });
            }
        },
    });
    return db;
};

// Add a new event to the database
export const addEvent = async (event) => {
    try {
        const db = await initDB();
        event = {
            id: Date.now(),
            ...event
        };
        await db.add('events', event);
        return {
            acknowledged: true,
            data: event
        };
    } catch (error) {
        console.log(error);
        return {
            acknowledged: false
        };
    }
};

export const getAllEvents = async (queryParams = {}) => {
    try {
        console.log(queryParams);
        const db = await initDB();
        let events = await db.getAll('events');

        // Check if search query exists and filter events based on it
        for (const [key, value] of Object.entries(queryParams)) {
            const searchValue = value.toLowerCase();
            events = events.filter(event => event[key]?.toLowerCase() === searchValue);
        }

        // Add more filters here if needed, based on other query parameters

        return events;
    } catch (error) {
        console.log(error);
        return {
            acknowledged: false
        };
    }
};


// Get details of a specific event by its ID
export const getEventDetails = async (id) => {
    try {
        const db = await initDB();
        const event = await db.get('events', parseInt(id));
        return event || null;
    } catch (error) {
        console.error('Error fetching event:', error);
        return null;
    }
};


// Update an existing event by its ID
export const editEvent = async (updatedEvent) => {
    const db = await initDB();
    updatedEvent.id = parseInt(updatedEvent.id);
    const event = await getEventDetails(updatedEvent.id);
    try {
        if (event) {
            await db.put('events', updatedEvent);
            return {
                acknowledged: true
            };
        } else {
            console.error('Event not found!');
            return {
                acknowledged: false
            };
        }
    } catch (error) {
        console.log(error);
        return {
            acknowledged: false
        };
    }
};

// Delete an event by its ID
export const deleteEvent = async (id) => {
    try {
        const db = await initDB();
        await db.delete('events', parseInt(id));
        return {
            acknowledged: true
        };
    } catch (error) {
        console.log(error);
        return {
            acknowledged: false
        };
    }
};
