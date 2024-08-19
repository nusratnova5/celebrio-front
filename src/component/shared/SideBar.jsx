import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const SideBar = ({ isOpenSidebar, toggleSidebar }) => {
    return (
        <div className="drawer lg:drawer-open z-10">
            <input checked={isOpenSidebar} type="checkbox" className="drawer-toggle" />
            <div className="drawer-side">
                <label onClick={toggleSidebar} aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-accent text-white">
                    <li>
                        <div className="flex-1">
                            <Link to={'/'} className="btn btn-ghost text-xl pl-0">Celebrio</Link>
                        </div>  
                    </li>
                    <li><NavLink onClick={toggleSidebar} to={'/'}>Calendar</NavLink></li>
                    <li><NavLink onClick={toggleSidebar} to={'/events'}>Events</NavLink></li>
                    {/* <li><Link onClick={toggleSidebar} to={'/dashboard/add-Events'}>Add Product</Link></li> */}
                </ul>

            </div>
        </div>
    );
};

export default SideBar;