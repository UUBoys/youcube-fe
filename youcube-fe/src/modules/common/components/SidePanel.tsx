import { useUserSessionContext } from '@/modules/contexts/userContext';
import Link from 'next/link';
import React from 'react'

type auth = 'logged' | 'notLogged' | 'both';

interface Tab {
    name: string;
    icon: string;
    href: string;
    auth: auth;
}

const tabs: Tab[] = [
    {
        name: 'Home',
        icon: 'home',
        href: '/home',
        auth: 'both',
    },
    {
        name: 'Profile',
        icon: 'user',
        href: '/profile',
        auth: 'logged',
    },
    {
        name: 'Upload',
        icon: 'upload',
        href: '/video/create',
        auth: 'logged',
    },
    {
        name: 'Logout',
        icon: 'logout',
        href: '/auth/signin',
        auth: 'logged',
    },
    {
        name: 'Login',
        icon: 'login',
        href: '/auth/signin',
        auth: 'notLogged',
    },
    {
        name: 'Register',
        icon: 'register',
        href: '/auth/signup',
        auth: 'notLogged',
    },
    {
        name: 'Playlists',
        icon: 'playlists',
        href: '/playlists',
        auth: 'both',
    }
];

const SidePanel: React.FC = () => {
    const user = useUserSessionContext();

    const isUserAuthenticated = user && user.user;

    return (
        <aside id="default-sidebar" className="hidden md:block fixed top-0 left-0 z-40 w-64 h-screen mt-16">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    {
                        tabs.filter((tab) =>
                            tab.auth === 'both' ||
                            (tab.auth === 'logged' && isUserAuthenticated) ||
                            (tab.auth === 'notLogged' && !isUserAuthenticated)
                        ).map((tab) => (
                            <li key={tab.name}>
                                <Link href={tab.href} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">{tab.name}  </span>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </aside>
    )
}

export default SidePanel
