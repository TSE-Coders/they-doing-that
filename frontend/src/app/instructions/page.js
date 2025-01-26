"use client"
import {  useState, useEffect } from 'react'
import * as React from 'react';
import Link from "next/link"

export default function InstructionsPage() {

    return (<main className='bg-black flex flex-col m-0 justify-stretch relative w-full h-dvh'>
        
        
        <div className='bg-black flex flex-row m-4 ml-0 max-h-14 justify-stretch relative w-full'>
        <div className='flex flex-row relative w-full'>
          <p className='text-red-600 text-6xl'>They</p>
          <p className='text-yellow-200 text-6xl'>Doing</p>
          <p className='text-sky-400 text-6xl'>That</p>
          <div className='flex flex-row justify-end mr-8 relative w-full items-center'>
          <button className='text-white text-l m-1 uppercase hover:bg-slate-900'><Link href='/'>Home</Link></button>
            <button className='text-white text-l m-2 uppercase hover:bg-slate-900'><Link href='/instructions'>Instructions</Link></button>
        </div>
        </div>
        
      </div>
      <div className="flex flex-col justify-center  place-items-stretch p-36 flex relative w-full h-dvh">

        <h1 className='text-white text-5xl'>What is this app?</h1>

        <p className='text-white pb-10'>Lorem ipsum odor amet, consectetuer adipiscing elit. Et libero curabitur nulla etiam vivamus senectus erat. Venenatis ultrices dui neque turpis orci. Dui odio montes sollicitudin lorem varius id tellus scelerisque. Nisi nibh nam scelerisque iaculis dis turpis sem vestibulum rutrum. Turpis tempus nibh accumsan phasellus dolor? Vulputate risus libero congue cursus enim vulputate maecenas. Sollicitudin mauris pharetra rhoncus nisi inceptos massa parturient tempus.</p>

        <h1 className='text-white text-5xl'>How do we use this?</h1>

        <p className='text-white pb-10'>Molestie nisl velit netus sodales, vestibulum habitasse netus. Suspendisse posuere volutpat hac eget dui laoreet vulputate. Amet pellentesque lectus commodo lacus nam conubia suscipit congue. Eros purus pulvinar mauris nisi faucibus lobortis nunc. Quis eleifend mollis sit odio tempus. Cras ullamcorper pharetra phasellus ornare non dapibus ornare volutpat. Commodo nullam sagittis venenatis enim integer maximus nascetur non. Viverra dictum enim ante ante, vehicula suscipit. Ultricies id vehicula nam vitae nullam. Fringilla magna amet magnis eu maximus a faucibus nam dignissim.</p>

        <h1 className='text-white text-5xl'>Issues with this app?</h1>

        <p className='text-white'>Non dapibus class consectetur augue vel purus egestas. Odio elit commodo; fringilla elementum donec habitasse. Dictum sollicitudin massa magna gravida aliquam. Nec et magnis taciti mus senectus ligula. Dapibus auctor sit sed mollis eros rhoncus sodales. Ultricies himenaeos praesent odio dui nisi dignissim. Maecenas dolor suscipit, semper cubilia aliquam efficitur. Iaculis sit vestibulum primis porta suspendisse montes sed. Nibh ex orci aliquam id inceptos.</p>

      </div>
        
        
        </main>
    
    
    )
}