'use client'; 
import { usePrivy } from '@privy-io/react-auth';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { generateUserData } from '../../app/lib/utils';

const UserInfo = ({ user }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { logout } = usePrivy();
    const router = useRouter();
    const pathname = usePathname();
    const dropdownRef = useRef(null); 

    const { profilePicture, username } = generateUserData(user);

    const formatWalletAddress = (address) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    const handleLogout = async () => {
        try {
            await logout();

            if (pathname === '/profile') {
                router.push('/');
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center focus:outline-none"
            > 
                {profilePicture && <img src={profilePicture} alt="Profile" className="w-8 h-8 rounded-full" />}
                {/* <span className="ml-2 text-sm font-medium">{username}</span> */}
            </button> 

            {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background border border-border-dark rounded-md shadow-lg z-50">
                    <Link href='/profile' className="flex items-center px-4 py-2">
                        <img
                            className="h-10 w-10 rounded-full mr-3"
                            src={profilePicture}
                            alt={username}
                        />
                        <div>
                            <p className="font-semibold cursor-pointer text-foreground">{username}</p>
                            <p className="text-sm text-foreground">{formatWalletAddress(user?.wallet?.address)}</p>
                        </div>
                    </Link>

                    <div className="border-t border-border-dark"></div>
                    <div className="mx-4 py-2">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2.5 text-foreground w-full p-2 px-2.5 rounded-md cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            )}





        </div>
    );
};

export default UserInfo;
