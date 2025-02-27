"use client"
import { usePathname } from "next/navigation";
import React, { useState } from 'react';
import Link from 'next/link';

interface NavbarItemProps {
    title: string;
    link: string;
  }
  
  function NavbarItem({ title, link }: NavbarItemProps) {
    const pathname = usePathname(); 
  
    const isActive = pathname === link;
  
    return (
      <Link
        href={link}
        className={`flex items-center p-1 rounded-lg ${
          isActive ? "text-[#19FF00] font-bold" : "text-gray-800 dark:text-white hover:text-[#19FF00]"
        }`}
      >
        <span className="block text-center  w-full">{title}</span>
      </Link>
    );
  }

function AsciiArt() {
    return (
        <div className="flex text-xs items-center justify-center p-4 rounded-sm ">
          <pre className="inline-block bg-gradient-to-r from-[#ff0000] via-yellow-500 to-[#19FF00] bg-clip-text text-transparent">
{`
                                                                         
 _|    _|  _|                        _|      _|  _|                  _|  
 _|    _|      _|      _|    _|_|    _|_|  _|_|      _|_|_|      _|_|_|  
 _|_|_|_|  _|  _|      _|  _|_|_|_|  _|  _|  _|  _|  _|    _|  _|    _|  
 _|    _|  _|    _|  _|    _|        _|      _|  _|  _|    _|  _|    _|  
 _|    _|  _|      _|        _|_|_|  _|      _|  _|  _|    _|    _|_|_|  

`}
</pre>

        </div>
    );
}


export default function Navbar() {
    return (
      <div className="navbar">
        <AsciiArt />
        <div className="w-full flex items-center">
          <div className="flex-1 flex justify-start">
            <nav className="md:grid md:grid-cols-3 md:gap-x-4 lg:px-4">
              <NavbarItem title="[ Blight ]" link="/blight" />
              <NavbarItem title="[ TelMeister ]" link="/telmeister" />
              <NavbarItem title="[ Trafficer ]" link="/netDeny" />
            </nav>
          </div>
          <div className="flex-1 flex justify-end">
            <nav className="md:grid md:grid-cols-2 md:gap-x-4 lg:px-6">
              <NavbarItem title="[ Account ]" link="#" />
              <NavbarItem title="[ Sign Out ]" link="#" />
            </nav>
          </div>
        </div>
      </div>
    );
  }
  