"use client"
import {  useState, useEffect } from 'react'
import * as React from 'react';

export default function Home() {
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


  //FETCH THAT 
  async function fetchThat() {
    try {
      const res = await fetch(`/api/that`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status} API unreachable`);
      }
  
      const payload = await res.json();
      if (payload && payload.that) {
        setThat(payload.that);
        setLoading(false);
      } else {
        setThat({ word: "no data" });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching that:", error);
      setThat({ word: "that" });
      setLoading(false);
    }
  }
  

 useEffect(() => {  
    
  const id = setInterval(() => {
                fetchThat()
                setCheck(check + 1)
              }, 3000);
  return () => clearInterval(id);            
  },[check]) 


  return (
    <main className='bg-black flex flex-col m-0 justify-stretch relative w-full h-dvh'>
      <div className='bg-black flex flex-row m-4 max-h-14 justify-stretch relative w-full'>
        <div className='flex flex-row relative w-full'>
          <p className='text-red-600 text-6xl'>They</p>
          <p className='text-yellow-200 text-6xl'>Doing</p>
          <p className='text-sky-400 text-6xl'>That</p>
          <div className='flex flex-row justify-end mr-8 relative w-full items-center'>
            <button className='text-white text-l m-1 uppercase hover:bg-slate-900'>Home</button>
            <button className='text-white text-l m-2 uppercase hover:bg-slate-900'>Instructions</button>
        </div>
        </div>
        
      </div>
      <div className="flex justify-stretch  place-items-stretch m-0 flex relative w-full h-dvh">
        {/* They */}
        <div className="flex justify-center bg-red-600 w-full h-dvh hover:bg-red-700">    
          <div className="m-auto mt-64 justify-items-center pb-56">
            <div className="pb-6">
              <p className='text-6xl text-wrap font-black text-red-950 uppercase text-center'>{data.name}</p>
            </div>
            <div className="">
              <form className="">
                <label className="">
                  <input type="text" placeholder="Add a pronoun" className="input rounded-full" />
                </label>
                <button className="btn btn-neutral border-0 bg-red-800 rounded-full">add</button>
              </form>
            </div>
            <div className='relative m-10 mt-32 justify-center'>
              <p className='text-center text-base text-red-950'>Powered by:</p>
              <p className='text-center text-base font-bold text-red-950 uppercase'>Ruby x Postgres</p>
            </div>
          </div>
        </div>
        {/* Doing */}
        <div className="flex justify-center bg-yellow-200 w-full h-dvh hover:bg-yellow-300">
          <div className="m-auto mt-64 justify-items-center pb-56">
            <div className="pb-6">
              <p className='text-6xl text-wrap font-black text-yellow-700 uppercase text-center'>Doing</p>
            </div>
            <div className="justify-items-center">
              <form className="">
                <label className="">
                  <input type="text" placeholder="Add a verb" className="input rounded-full" />
                </label>
                <button className="btn btn-neutral border-0 bg-yellow-500 rounded-full">add</button>
              </form>
              <div className='relative m-10 mt-32 justify-center'>
                <p className='text-center text-base text-yellow-700'>Powered by:</p>
                <p className='text-center text-base font-bold text-yellow-700 uppercase'>Python x Mongo</p>
            </div>
            </div>
          </div>
        </div>
        {/* That */}
        <div className="flex justify-center bg-sky-400 w-full h-dvh hover:bg-sky-500">
          <div className="m-auto mt-64 justify-items-center pb-56">
            <div className="pb-6">
            <p className='text-6xl text-wrap font-black text-sky-800 uppercase text-center'>{that.word}</p>
            </div>
            <div className="">
              <form className="">
                <label className="">
                  <input type="text" placeholder="Add a noun" className="input rounded-full" />
                </label>
                <button className="btn btn-neutral border-0 bg-sky-600 rounded-full">add</button>
              </form>
            </div>
            <div className='relative m-10 mt-32 justify-center'>
              <p className='text-center text-base text-sky-800'>Powered by:</p>
              <p className='text-center text-base font-bold text-sky-800 uppercase'>Go x MySQL</p>
            </div>
          </div>
        </div>        
    </div>
    <div className='bg-black p-4'>

    </div>
    </main>
  );
}
