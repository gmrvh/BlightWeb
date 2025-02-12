"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Sidebar from '../Sidebar';
import SlaveStatistics from './SlaveStatistics';
export default function BlightPage() {
  return (
    <div className="w-full flex ">
      <div className="container mx-auto  ms-4">
        <h1 className="text-2xl font-bold">Slaves >></h1>
        <SlaveStatistics />
      </div>
    </div>
  );
  
}

