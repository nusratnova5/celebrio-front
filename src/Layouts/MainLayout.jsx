import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className='flex flex-col'>
            {/* <Navbar/> */}
            <div className='flex-1'>
            <Outlet/>
            </div>
            {/* <Footer/> */}
        </div>
    );
};

export default MainLayout;