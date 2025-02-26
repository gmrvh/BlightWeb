//Sidebar.js
"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  title: string;
  link: string;
}

function SidebarItem({ title, link }: SidebarItemProps) {
  const pathname = usePathname(); 
  const isActive = pathname === link;

  return (
    <Link href={link} className={`flex items-center p-1 rounded-lg ${
          isActive ? "text-[#19FF00] font-bold" : "text-gray-800 dark:text-white hover:text-[#19FF00]"
        }`}>
            <span className="block text-left w-full text-gray-800 dark:text-white hover:text-[#19FF00]">
                {title}
            </span>
            <span>>></span>
        </Link>
  );
}

const Sidebar = () => {
  // State to manage the open/close state of the sidebar
  

  return (
    <div className="sidebar">
        <div className="px-3 py-4 overflow-y-auto bg-black-50 dark:bg-black-800 text-wrap border-r-2 border-gray-200 dark:border-gray-700">
            <ul className="space-y-4">
              <SidebarItem title="Slaves"  link="/blight"/>
              <SidebarItem title="PE Builder"  link="#"/>
              <SidebarItem title="Payload Config."  link="#"/>
              <SidebarItem title="Slave Config."  link="#"/>
              <SidebarItem title="Server Config."  link="#"/>
            </ul>
        </div>
    </div>
  );
};

export default Sidebar;
