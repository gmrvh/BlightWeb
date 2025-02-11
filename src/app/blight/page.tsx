"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Sidebar from '../Sidebar';

export default function BlightPage() {
  return (
    
    <div className='w-80 flex md:grid md:grid-cols-2'>
    <Sidebar />  
    <div className='container mx-auto py-2 ms-4'>
      <h1 className='text-2xl font-bold'>BlightC2</h1>
      <p className='text-gray-800 dark:text-white'>Welcome to BlightC2</p>
      </div>
    </div>
  );
}

