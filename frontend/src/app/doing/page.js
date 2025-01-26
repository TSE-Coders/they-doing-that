"use client"
import {  useState, useEffect } from 'react'
import * as React from 'react';
import Link from "next/link"

export default function DoingPage() {

    return (<main className='bg-yellow-700 flex flex-col m-0 justify-stretch relative w-full h-dvh'>
    <div className='bg-yellow-700 flex flex-row m-4 ml-0 max-h-14 justify-stretch relative w-full'>
    <div className='flex flex-row relative w-full'>
    <Link href='/they'><p className='text-yellow-400 text-6xl hover:text-red-600'>They</p></Link>
        <p className='text-yellow-400 text-6xl font-semibold'>Doing</p>
      <Link href='/that'><p className='text-yellow-400 text-6xl hover:text-sky-400'>That</p></Link>
      <div className='flex flex-row justify-end mr-8 relative w-full items-center'>
      <button className='text-yellow-400 text-l m-1 uppercase hover:text-black'><Link href='/'>Home</Link></button>
        <button className='text-yellow-400 text-l m-2 uppercase hover:text-black'><Link href='/instructions'>Instructions</Link></button>
    </div>
    </div>
    
  </div>
  <div className='flex flex-row m-0 justify-stretch relative w-full h-dvh'>
  <div className="bg-yellow-400 flex flex-col justify-center items-center  place-items-stretch m-0 flex relative w-full h-dvh border-r-4 border-yellow-600">

          <p className='text-8xl text-wrap font-black text-yellow-700 uppercase text-center p-36'>Swim</p>
          <div className='relative m-10 mt-44 justify-center content-end'>
          <p className='text-center text-base text-sm text-yellow-700'>Powered by:</p>
          <p className='text-center text-base font-bold text-yellow-700 uppercase'>Python x Mongo</p>
        </div>

    </div>
 <div className="bg-yellow-400 flex flex-col justify-stretch  place-items-stretch m-0 flex relative w-full h-dvh">
    <div className='flex justify-stretch  place-items-stretch m-auto flex relative w-full h-dvh border-b-4 border-yellow-600'>
          <form className="flex flex-col justify-stretch w-full m-auto">
            <label className="flex items-center gap-8">
              <input type="text" placeholder="add word here" className="input input-bordered w-full ml-20 mr-20" />
            </label>
            <button className="btn  ml-36 mr-36 mt-4 border-0 bg-yellow-500 rounded-full">add a verb</button>
            <button className="btn  ml-36 mr-36 mt-4 border-0 bg-yellow-500 rounded-full">remove a verb</button>
          </form>

    </div>
    <div className='bg-yellow-400 flex justify-stretch  place-items-stretch m-4 ml-0 flex relative w-full h-dvh'>
    <div class="grid grid-cols-4 gap-4 relative w-full p-6">
        <div className='bg-yellow-600 rounded-full text-center content-center text-white uppercase font-bold'>Eat</div>
        <div className='bg-yellow-600 rounded-full text-center content-center text-white uppercase font-bold'>Walk</div>
        <div className='bg-yellow-600 rounded-full text-center content-center text-white uppercase font-bold'>Swim</div>
        <div className='bg-yellow-600 rounded-full text-center content-center text-white uppercase font-bold'>Write</div>
        <div className='bg-yellow-600 rounded-full text-center content-center text-white uppercase font-bold'>Code</div>
        <div className='bg-yellow-600 rounded-full text-center content-center text-white uppercase font-bold'>Drive</div>
        <div className='bg-yellow-600 rounded-full text-center content-center text-white uppercase font-bold'>Race</div>
        <div className='bg-yellow-600 rounded-full text-center content-center text-white uppercase font-bold'>Drink</div>
        <div className='bg-yellow-600 rounded-full text-center content-center text-white uppercase font-bold'>Watch</div>
        <div className='bg-yellow-600 rounded-full text-center content-center text-white uppercase font-bold'>Blink</div>
        <div className='bg-yellow-600 rounded-full text-center content-center text-white uppercase font-bold'>Think</div>
        <div className='bg-yellow-600 rounded-full text-center content-center text-white uppercase font-bold'>Run</div>
        <div className='bg-yellow-600 rounded-full text-center content-center text-white uppercase font-bold'>Stare</div>
        <div className='bg-yellow-600 rounded-full text-center content-center text-white uppercase font-bold'>Play</div>
        <div className='bg-yellow-600 rounded-full text-center content-center text-white uppercase font-bold'>Clean</div>
        <div className='bg-yellow-600 rounded-full text-center content-center text-white uppercase font-bold'>Sleep</div>
        </div>

    </div>

    </div>

  </div>

    </main>

    
    
    )
}