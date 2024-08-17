import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../component/Dashboard/Dashboard";
import AllEvents from "../component/AllEvents/AllEvents";
import AddEvents from "../component/AddEvents/AddEvents";
import EditEvent from "../component/EditEvent/EditEvent";
import DashboardLayout from "../Layouts/DashboardLayout";
import axios from "axios";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout />,
        // <PrivateRoute> <DashboardLayout /> </PrivateRoute>
        children: [
            {
                path: "",
                element: <Dashboard />,
                loader: (async () => {
                    try {
                        const token = localStorage.getItem('token');
                        const headers = {
                            Authorization: `Bearer ${token}`
                        };
                        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/dashboard-data`, { headers });
                        return response.data;
                    } catch (error) {
                        console.error('Error fetching Events:', error);
                        throw error; // Rethrow the error to handle it outside
                    }
                })
            },
            {
                path: "add-events",
                element: <AddEvents />
            },
            {
                path: "all-events",
                element: <AllEvents />
            },
            {
                path: "edit-event/:id",
                element: <EditEvent/>,
                loader: (async ({ params }) => {
                    try {
                        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events/${params.id}`);
                        return response.data; // Return the fetched Events
                    } catch (error) {
                        console.error('Error fetching Events:', error);
                        throw error; // Rethrow the error to handle it outside
                    }
                })
            }
        ]
    },
]);
