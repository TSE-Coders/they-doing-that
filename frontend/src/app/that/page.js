"use client"
import {  useState, useEffect } from 'react'
import * as React from 'react';
import Link from "next/link"

export default function ThatPage() {

    return (<main className='bg-sky-900 flex flex-col m-0 justify-stretch relative w-full h-dvh'>
    <div className='bg-sky-900 flex flex-row m-4 ml-0 max-h-14 justify-stretch relative w-full'>
    <div className='flex flex-row relative w-full'>
      <Link href='/they'><p className='text-sky-600 text-6xl hover:text-red-600'>They</p></Link>
      <Link href='/doing'><p className='text-sky-600 text-6xl hover:text-yellow-200'>Doing</p></Link>
        <p className='text-sky-600 text-6xl font-semibold'>That</p>
      <div className='flex flex-row justify-end mr-8 relative w-full items-center'>
      <button className='text-sky-600 text-l m-1 uppercase hover:text-black'><Link href='/'>Home</Link></button>
        <button className='text-sky-600 text-l m-2 uppercase hover:text-black'><Link href='/instructions'>Instructions</Link></button>
    </div>
    </div>
    
  </div>
  <div className='flex flex-row m-0 justify-stretch relative w-full h-dvh'>
  <div className="bg-sky-600 flex flex-col justify-center items-center  place-items-stretch m-0 flex relative w-full h-dvh border-r-4 border-sky-900">

          <p className='text-8xl text-wrap font-black text-sky-900 uppercase text-center p-36'>Highway</p>
          <div className='relative m-10 mt-44 justify-center content-end'>
          <p className='text-center text-base text-sm text-sky-900'>Powered by:</p>
          <p className='text-center text-base font-bold text-sky-900 uppercase'>Go x MySQL</p>
        </div>

    </div>
 <div className="bg-sky-600 flex flex-col justify-stretch  place-items-stretch m-0 flex relative w-full h-dvh">
    <div className='flex justify-stretch  place-items-stretch m-auto flex relative w-full h-dvh border-b-4 border-sky-900'>
          <form className="flex flex-col justify-stretch w-full m-auto">
            <label className="flex items-center gap-8">
              <input type="text" placeholder="add word here" className="input input-bordered w-full ml-20 mr-20" />
            </label>
            <button className="btn  ml-36 mr-36 mt-4 border-0 bg-sky-800 rounded-full">add a noun</button>
            <button className="btn  ml-36 mr-36 mt-4 border-0 bg-sky-800 rounded-full">remove a noun</button>
          </form>

    </div>
    <div className='bg-sky-600 flex justify-stretch  place-items-stretch m-4 ml-0 flex relative w-full h-dvh'>
    <div class="grid grid-cols-4 gap-4 relative w-full p-6">
        <div className='bg-sky-900 rounded-full text-center content-center text-white uppercase font-bold'>Highway</div>
        <div className='bg-sky-900 rounded-full text-center content-center text-white uppercase font-bold'>Lake</div>
        <div className='bg-sky-900 rounded-full text-center content-center text-white uppercase font-bold'>Restaurant</div>
        <div className='bg-sky-900 rounded-full text-center content-center text-white uppercase font-bold'>Table</div>
        <div className='bg-sky-900 rounded-full text-center content-center text-white uppercase font-bold'>Computer</div>
        <div className='bg-sky-900 rounded-full text-center content-center text-white uppercase font-bold'>Book</div>
        <div className='bg-sky-900 rounded-full text-center content-center text-white uppercase font-bold'>Shoebox</div>
        <div className='bg-sky-900 rounded-full text-center content-center text-white uppercase font-bold'>Blanket</div>
        <div className='bg-sky-900 rounded-full text-center content-center text-white uppercase font-bold'>Tv</div>
        <div className='bg-sky-900 rounded-full text-center content-center text-white uppercase font-bold'>Hospital</div>
        <div className='bg-sky-900 rounded-full text-center content-center text-white uppercase font-bold'>Car</div>
        <div className='bg-sky-900 rounded-full text-center content-center text-white uppercase font-bold'>Cake</div>
        <div className='bg-sky-900 rounded-full text-center content-center text-white uppercase font-bold'>Bus</div>
        <div className='bg-sky-900 rounded-full text-center content-center text-white uppercase font-bold'>House</div>
        <div className='bg-sky-900 rounded-full text-center content-center text-white uppercase font-bold'>Vegetable</div>
        <div className='bg-sky-900 rounded-full text-center content-center text-white uppercase font-bold'>Phone</div>
        </div>

    </div>

    </div>

  </div>

    </main>
    
    
    )
}