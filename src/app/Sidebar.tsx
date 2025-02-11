//Sidebar.js
"use client"
import React, { useState } from 'react';
import Link from 'next/link';

interface SidebarItemProps {
  title: string;
  icon: React.ReactNode;
  link: string;
}

function SidebarItem({ title, icon, link }: SidebarItemProps) {
  return (
    <Link href={link} className="flex items-center p-1 rounded-lg ">
            <span className="block text-center w-full text-gray-800 dark:text-white hover:text-lime-300">
                {title}
            </span>
        </Link>
  );
}

const Sidebar = () => {
  // State to manage the open/close state of the sidebar
  

  return (
    <div className="sidebar">
        <div className="px-3 py-4 overflow-y-auto bg-black-50 dark:bg-black-800 text-wrap border-r-2 border-gray-200 dark:border-gray-700">
            <ul className="space-y-4">
              <SidebarItem title="Dashboard >>" icon={<svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21"><path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/><path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/></svg>} link="#"/>
              <SidebarItem title="Slaves >>" icon={<svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21"><path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/><path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/></svg>} link="#"/>
              <SidebarItem title="Builder >>" icon={<svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21"><path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/><path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/></svg>} link="#"/>
              <SidebarItem title="Server Configs. >>" icon={<svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21"><path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/><path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/></svg>} link="#"/>
            </ul>
        </div>
    </div>
  );
};

export default Sidebar;
