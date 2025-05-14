'use client'
import {  useState, useEffect } from 'react'

const DoingWordDisplay = () => {
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
      if (payload && payload.data) {
        setDoing(payload.data);
        setLoading(false);
      } else {
        setDoing({ word: "no data" });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching doing:", error);
      setDoing({ word: "no data available" });
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
       <div className="bg-yellow-400 flex flex-col justify-center w-full border-r-4 border-yellow-600">
            <p className='text-8xl text-wrap font-black text-yellow-700 uppercase text-center'>{isLoading ? `Loading...` : doing.word}</p>
            <div className='relative mt-24 justify-center content-end'>
                <p className='text-center text-base text-sm text-yellow-700'>Powered by:</p>
                <p className='text-center text-base font-bold text-yellow-700 uppercase'>Java x SQLServer</p>
            </div>
        </div>
  )
}

export default DoingWordDisplay
