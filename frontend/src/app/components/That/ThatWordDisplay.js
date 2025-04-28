'use client'
import {  useState, useEffect } from 'react'

const ThatWordDisplay = () => {
    const [that, setThat] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [check, setCheck] = useState(0)
    
      //FETCH RANDOM NAME
      async function fetchName() {
        try {
          const res = await fetch(`/api/getRandomNoun`);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status} API unreachable`);
          }
      
          const payload = await res.json();
          if (payload && payload.data) {
            setThat(payload.data);
            setLoading(false);
          } else {
            setThat({ word: "no data" });
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching name:", error);
          setThat({ word: "highway" });
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
        <div className="bg-sky-600 flex flex-col justify-center items-center  place-items-stretch m-0 flex relative w-full h-dvh border-r-4 border-sky-900">
            <p className='text-8xl text-wrap font-black text-sky-900 uppercase text-center p-36'>{isLoading ? `Loading...` : that.word}</p>
            <div className='relative m-10 mt-44 justify-center content-end'>
                <p className='text-center text-base text-sm text-sky-900'>Powered by:</p>
                <p className='text-center text-base font-bold text-sky-900 uppercase'>Go x MySQL</p>
            </div>
        </div>
    )
}

export default ThatWordDisplay
