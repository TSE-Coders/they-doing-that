'use client'
import Link from "next/link"
import {  useState, useEffect } from 'react'

const DoingHome = () => {
  const [doing, setDoing] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [check, setCheck] = useState(0)
  
  async function fetchDoing() {

      try {
        const res = await fetch(`/api/getRandomVerb`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status} API unreachable`);
        }
    
        const payload = await res.json();

        console.log(payload)
        if (payload && payload.data) {
          setDoing(payload.data);
          setLoading(false);
        } else {
          setDoing({ word: "no data" });
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching doing:", error);
        setDoing({ word: "swim" });
        setLoading(false);
      }
    }
    
  
   useEffect(() => {  
      
    const id = setInterval(() => {
                  fetchDoing()
                  setCheck(check + 1)
                }, 3000);
    return () => clearInterval(id);            
    },[check]) 

    return (
      <div className="flex justify-center content-stretch bg-yellow-300 w-full hover:bg-yellow-400">
      <div className="m-auto mt-64 justify-items-center">
        <div className="pb-6">
          <p className='text-6xl text-wrap font-black text-yellow-700 uppercase text-center'>{isLoading ? `Loading...` : doing.word}</p>
        </div>
        <div className="justify-items-center">
        <Link href='/doing'><button className="btn btn-neutral border-0 bg-yellow-600 rounded-full">add a verb</button></Link>
        </div>
          <div className='relative m-10 mt-44 justify-center'>
            <p className='text-center text-sm text-yellow-700'>Powered by:</p>
            <p className='text-center text-base font-bold text-yellow-700 uppercase'>Java x SQLServer</p>
        </div>
      </div>
    </div>
    )
}

export default DoingHome
