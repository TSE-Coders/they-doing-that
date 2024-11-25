"use client"
import {  useState, useEffect } from 'react'
import * as React from 'react';


export default function Home() {
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [check, setCheck] = useState(0)

  async function fetchName(){
    const res = await fetch(`/api//name`)
    const payload = await res.json() 
     setData(payload.data)
    //  debugger
     typeof data.name == "undefined"? isLoading : setLoading(false)
      
 }

 useEffect(() => {  
    
  const id = setInterval(() => {
                fetchName()
                setCheck(check + 1)
              }, 3000);
  return () => clearInterval(id);            
  },[check]) 


  return (
    <main>
      <div className="grid grid-cols-3 justify-center gap-4 place-content-center place-items-center m-20 ">
        {/* They */}
        <div className="grid grid-row-2 justify-center gap-4 place-content-center place-items-center m-20">    
          <div className="">
            <div className="m-5 place-content-center place-items-center text-5xl">
              <p>{data.name}</p>
            </div>
            <div className="place-content-center place-items-center">
              <form className="place-content-center place-items-center">
                <label className="flex items-center gap-8">
                  <input type="text" placeholder="Add a name" className="input input-bordered w-full max-w-xs" />
                </label>
                <button className="btn btn-neutral">add</button>
              </form>
            </div>
          </div>
        </div>
        {/* Doing */}
        <div className="grid grid-row-2 justify-center gap-4 place-content-center place-items-center m-20">
          <div className="">
            <div className="m-5 place-content-center place-items-center text-5xl">
              <p>DOING</p>
            </div>
            <div className="place-content-center place-items-center">
              <form className="place-content-center place-items-center">
                <label className="flex items-center gap-8">
                  <input type="text" placeholder="Add a verb" className="input input-bordered w-full max-w-xs" />
                </label>
                <button className="btn btn-neutral">add</button>
              </form>

            </div>
          </div>
        </div>
        {/* That */}
        <div className="grid grid-row-2 justify-center gap-4 place-content-center place-items-center m-20">
          <div className="">
            <div className="m-5 place-content-center place-items-center text-5xl">
              <p>THAT</p>
            </div>
            <div className="place-content-center place-items-center">
              <form className="place-content-center place-items-center">
                <label className="flex items-center gap-8">
                  <input type="text" placeholder="Add an action" className="input input-bordered w-full max-w-xs" />
                </label>
                <button className="btn btn-neutral">add</button>
              </form>

            </div>
          </div>
        </div>        
    </div>
    </main>
  );
}
