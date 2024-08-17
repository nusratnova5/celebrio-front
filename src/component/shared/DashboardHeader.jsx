import React from 'react';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../../Firebase/Firebase.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import avatar from '/images/user.png'
import { SlArrowDown } from 'react-icons/sl';
import { IoNotificationsOutline } from 'react-icons/io5';
import { HiMiniArrowRightEndOnRectangle } from 'react-icons/hi2';
import { Link, useNavigate } from 'react-router-dom';


const DashboardHeader = ({ toggleSidebar }) => {
    const [user] = useAuthState(auth);
    const [signOut] = useSignOut(auth);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <div className="navbar bg-white fixed px-2 py-0 lg:px-10 z-10 top-0 left-0 lg:left-80 w-auto right-0">
            <div className="flex-1">
                <div className="hidden lg:inline-block dropdown dropdown-end">
                    <div className='flex justify-center items-center gap-2'>
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            <img src={avatar} alt="User Avatar" className="rounded-full w-12 h-12" />
                            <div className='flex flex-col gap-1'>
                                <div className='flex items-center justify-between'>
                                    <p className='font-medium text-dark-black'>Sagar Sani</p>
                                    <SlArrowDown className='text-xs' />
                                </div>
                                <p className='font-normal text-dark-gray'>sagar@email.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:hidden flex-1 p-4">
                    <Link to={'/'} className="btn bg-transparent border-none shadow-none text-3xl text-sky-blue flex-nowrap">E-Therapists</Link>
                </div>
            </div>
            <div className="flex-none gap-2">
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label onClick={toggleSidebar} className="btn bg-transparent border-0 shadow-transparent drawer-button lg:hidden">
                        <FontAwesomeIcon icon={faBars} />
                    </label>

                </div>
                <div className='flex justify-center items-center gap-3 '>
                    <IoNotificationsOutline className='border border-gray rounded-full text-3xl p-1' />
                    <div className="divider divider-horizontal h-8 my-auto m-0 hidden lg:flex"></div>
                    <button onClick={handleLogout} className='btn bg-transparent border-0 shadow-none items-center gap-2 hidden lg:flex text-dark-red pl-0'>Logout<HiMiniArrowRightEndOnRectangle className='text-dark-red bg-light-red rounded-full p-2 text-4xl' />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default DashboardHeader;