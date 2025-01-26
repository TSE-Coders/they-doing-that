"use client"
import {  useState, useEffect } from 'react'
import * as React from 'react';
import Link from "next/link"

export default function TheyPage() {

  const [data, setData] = useState([])
  const [that, setThat] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [check, setCheck] = useState(0)


  //FETCH NAME 
  async function fetchName() {
    try {
      const res = await fetch(`/api/name`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status} API unreachable`);
      }
  
      const payload = await res.json();
      if (payload && payload.data) {
        setData(payload.data);
        setLoading(false);
      } else {
        setData({ name: "no data available" });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching name:", error);
      setData({ name: "no data available" });
      setLoading(false);
    }
  }

 useEffect(() => {  
    
  const id = setInterval(() => {
                fetchName()
                setCheck(check + 1)
              }, 3000);
  return () => clearInterval(id);            
  },[check]) 

    return (<main className='bg-red-950 flex flex-col m-0 justify-stretch relative w-full h-dvh'>
        <div className='bg-red-950 flex flex-row m-4 ml-0 max-h-14 justify-stretch relative w-full'>
        <div className='flex flex-row relative w-full'>
            <p className='text-red-700 text-6xl font-semibold'>They</p>
            <Link href='/doing'><p className='text-red-700 text-6xl hover:text-yellow-200'>Doing</p></Link>
            <Link href='/that'><p className='text-red-700 text-6xl hover:text-sky-400'>That</p></Link>
          <div className='flex flex-row justify-end mr-8 relative w-full items-center'>
          <button className='text-red-700 text-l m-1 uppercase hover:text-black'><Link href='/'>Home</Link></button>
            <button className='text-red-700 text-l m-2 uppercase hover:text-black'><Link href='/instructions'>Instructions</Link></button>
        </div>
        </div>
        
      </div>
      <div className='flex flex-row m-0 justify-stretch relative w-full h-dvh'>
      <div className="bg-red-700 flex flex-col justify-center items-center  place-items-stretch m-0 flex relative w-full h-dvh border-r-4 border-red-950">
   
              <p className='text-8xl text-wrap font-black text-red-950 uppercase text-center p-36'>{data.name}</p>
              <div className='relative m-10 mt-44 justify-center content-end'>
              <p className='text-center text-base text-sm text-red-950'>Powered by:</p>
              <p className='text-center text-base font-bold text-red-950 uppercase'>Ruby x Postgres</p>
            </div>

        </div>
     <div className="bg-red-700 flex flex-col justify-stretch  place-items-stretch m-0 flex relative w-full h-dvh">
        <div className='flex justify-stretch  place-items-stretch m-auto flex relative w-full h-dvh border-b-4 border-red-950'>
              <form className="flex flex-col justify-stretch w-full m-auto">
                <label className="flex items-center gap-8">
                  <input type="text" placeholder="add word here" className="input input-bordered w-full ml-20 mr-20" />
                </label>
                <button className="btn  ml-36 mr-36 mt-4 border-0 bg-red-800 rounded-full">add a subject</button>
                <button className="btn  ml-36 mr-36 mt-4 border-0 bg-red-800 rounded-full">remove a subject</button>
              </form>

        </div>
        <div className='bg-red-700 flex justify-stretch  place-items-stretch m-4 ml-0 flex relative w-full h-dvh'>
        <div class="grid grid-cols-4 gap-4 relative w-full p-6">
            <div className='bg-red-950 rounded-full text-center content-center text-white uppercase font-bold'>Tori</div>
            <div className='bg-red-950 rounded-full text-center content-center text-white uppercase font-bold'>Daniel</div>
            <div className='bg-red-950 rounded-full text-center content-center text-white uppercase font-bold'>Brian</div>
            <div className='bg-red-950 rounded-full text-center content-center text-white uppercase font-bold'>George</div>
            <div className='bg-red-950 rounded-full text-center content-center text-white uppercase font-bold'>Maca</div>
            <div className='bg-red-950 rounded-full text-center content-center text-white uppercase font-bold'>Ludmilla</div>
            <div className='bg-red-950 rounded-full text-center content-center text-white uppercase font-bold'>Samantha</div>
            <div className='bg-red-950 rounded-full text-center content-center text-white uppercase font-bold'>John</div>
            <div className='bg-red-950 rounded-full text-center content-center text-white uppercase font-bold'>Joann</div>
            <div className='bg-red-950 rounded-full text-center content-center text-white uppercase font-bold'>Albert</div>
            <div className='bg-red-950 rounded-full text-center content-center text-white uppercase font-bold'>Donna</div>
            <div className='bg-red-950 rounded-full text-center content-center text-white uppercase font-bold'>Faye</div>
            <div className='bg-red-950 rounded-full text-center content-center text-white uppercase font-bold'>Carol</div>
            <div className='bg-red-950 rounded-full text-center content-center text-white uppercase font-bold'>Tori-Ann</div>
            <div className='bg-red-950 rounded-full text-center content-center text-white uppercase font-bold'>Alejandro</div>
            <div className='bg-red-950 rounded-full text-center content-center text-white uppercase font-bold'>Ravi</div>
            </div>

        </div>

        </div>

      </div>

        </main>
    
    
    )
}