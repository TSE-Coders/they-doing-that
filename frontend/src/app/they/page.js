"use client"
import {  useState, useEffect } from 'react'
import * as React from 'react';
import Link from "next/link"

export default function TheyPage() {

    return (<main className='bg-red-700 flex flex-col m-0 justify-stretch relative w-full h-dvh'>
        <div className='bg-red-700 flex flex-row m-4 max-h-14 justify-stretch relative w-full'>
        <div className='flex flex-row relative w-full'>
          <p className='text-red-950 text-6xl font-semibold'>They</p>
          <p className='text-red-950 text-6xl'>Doing</p>
          <p className='text-red-950 text-6xl'>That</p>
          <div className='flex flex-row justify-end mr-8 relative w-full items-center'>
          <button className='text-red-950 text-l m-1 uppercase hover:text-black'><Link href='/'>Home</Link></button>
            <button className='text-red-950 text-l m-2 uppercase hover:text-black'><Link href='/instructions'>Instructions</Link></button>
        </div>
        </div>
        
      </div>
      <div className="flex justify-stretch  place-items-stretch m-0 flex relative w-full h-dvh">

      </div>
        </main>
    
    
    )
}