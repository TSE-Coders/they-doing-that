'use client'
import Link from "next/link"
import {  useState, useEffect } from 'react'

const ThatHome = () => {

const [that, setThat] = useState([])
const [isLoading, setLoading] = useState(true)
const [check, setCheck] = useState(0)

//FETCH THAT 
async function fetchThat() {
    try {
      const res = await fetch(`/api/getRandomNoun`);
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
      setThat({ word: "highway" });
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
    <div className="flex justify-stretch content-stretch bg-sky-400 w-full  hover:bg-sky-500">
      <div className="m-auto mt-64 justify-items-center ">
        <div className="pb-6">
        <p className='text-6xl text-wrap font-black text-sky-800 uppercase text-center'>{isLoading ? `Loading...` : that.word}</p>
        </div>
        <div className="">
        <Link href='/that'><button className="btn btn-neutral border-0 bg-sky-700 rounded-full">add a noun</button></Link>
        </div>
        <div className='relative m-10 mt-44 justify-center'>
          <p className='text-center text-sm text-sky-800'>Powered by:</p>
          <p className='text-center text-base font-bold text-sky-800 uppercase'>Go x MySQL</p>
        </div>
      </div>
    </div>   
)
}

export default ThatHome
