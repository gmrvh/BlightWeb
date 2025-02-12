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
          isActive ? "text-lime-500 font-bold" : "text-gray-800 dark:text-white hover:text-lime-300"
        }`}
      >
        <span className="block text-center w-full">{title}</span>
      </Link>
    );
  }

function AsciiArt() {
    return (
        <div className="flex text-xs items-center justify-center p-4 rounded-sm ">
            <pre className=" inline-block bg-gradient-to-r from-red-600 via-yellow-500 to-green-400 bg-clip-text text-transparent ">
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
        <nav className="w-full flex md:grid md:grid-cols-4 md:gap-x-8 basis-full items-center px-4 sm:px-6 lg:px-8 py-2">
          <NavbarItem title="[ BlightC2 ]" link="/blight" />
          <NavbarItem title="[ telMeister ]" link="/telMeister" />
          <NavbarItem title="[ netDeny ]" link="/netDeny" />
          <NavbarItem title="[ Dashboard ]" link="/dashboard" />
        </nav>
        <hr className="border-t-2 border-gray-200 dark:border-gray-700 py-2" />
      </div>
    );
  }
  