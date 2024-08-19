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
                element: <Dashboard />
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
            }
        ]
    },
]);
