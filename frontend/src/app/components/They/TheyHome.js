'use client'
import Link from "next/link"
import {  useState, useEffect } from 'react'

const TheyHome = () => {
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [check, setCheck] = useState(0)

  //FETCH RANDOM NAME
  async function fetchName() {
    try {
      const res = await fetch(`/api/getRandomName`);
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

    return (
        <div className="flex justify-center bg-red-600 w-full h-dvh hover:bg-red-700">    
          <div className="m-auto mt-64 justify-items-center pb-56">
            <div className="pb-6">
              <p className='text-6xl text-wrap font-black text-red-950 uppercase text-center'>{isLoading ? `Loading...` : data.name}</p>
            </div>
            <div className="">
            <Link href='/they'><button className="btn btn-neutral border-0 bg-red-800 rounded-full">add a subject</button></Link>
            </div>
            <div className='relative m-10 mt-44 justify-center'>
              <p className='text-center text-base text-sm text-red-950'>Powered by:</p>
              <p className='text-center text-base font-bold text-red-950 uppercase'>Ruby x Postgres</p>
            </div>
          </div>
        </div>
    )
}

export default TheyHome