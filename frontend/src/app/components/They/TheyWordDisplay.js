'use client'
import {  useState, useEffect } from 'react'
// import { datadogLogs } from '@datadog/browser-logs';

const TheyWordDisplay = () => {
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [check, setCheck] = useState(0)

  //FETCH RANDOM NAME
  async function fetchName() {
    try {
      const res = await fetch(`/api/getRandomName`);
      if (!res.ok) {
        // datadogLogs.logger.error("Error Fetching name from backend", {
        //   contextKey: res.status,
        // timestamp: Date.now()
        // });
        throw new Error(`HTTP error! status: ${res.status} API unreachable`);
      }
  
      const payload = await res.json();
      if (payload && payload.data) {
        // datadogLogs.logger.info("Name Fetched successfully", {
        //   payload: payload
        // ,
        // timestamp: Date.now()
        // });
        setData(payload.data);
        setLoading(false);
      } else {
        setData({ name: "no data available" });
        datadogLogs.logger.error("No data available in response", {
          payload: payload,
          timestamp: Date.now()
        });
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
    <div className="h-full bg-red-700 flex flex-col justify-center items-center  w-full border-r-4 border-red-950">
        <p className='text-8xl text-wrap font-black text-red-950 uppercase text-center'>{isLoading ? `Loading...` : data.name}</p>
        <div className='relative m-10 mt-24 justify-center content-end'>
            <p className='text-center text-base text-sm text-red-950'>Powered by:</p>
            <p className='text-center text-base font-bold text-red-950 uppercase'>Ruby x Postgres</p>
        </div>
    </div>
)
}
export default TheyWordDisplay
