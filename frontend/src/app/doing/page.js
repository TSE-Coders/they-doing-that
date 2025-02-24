"use client"
import {  useState, useEffect } from 'react'
import * as React from 'react';
import DoingHeader from '../components/Doing/DoingHeader';
import VerbList from '../components/Doing/VerbList';
import DoingWordDisplay from '../components/Doing/DoingWordDisplay';
import DoingForm from '../components/Doing/DoingForm';


export default function DoingPage() {
    const [verb, setVerb] = useState([]);
        
            useEffect(() => {
                async function fetchAllVerbs() {
                    try {
                      const res = await fetch(`/api/getAllVerbs`);
                      if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status} API unreachable`);
                      }
                  
                      const payload = await res.json();
                      if (payload && payload.data) {
                        setVerb(payload.data);
                      } else {
                        setVerb({ word: "no data available" });
                      }
                    } catch (error) {
                      console.error("Error fetching name:", error);
                      setVerb({ word: "no data available" });
                    }
                  }
                  fetchAllVerbs()
            }, [])

    return (
    <main className='bg-yellow-700 flex flex-col m-0 justify-stretch relative w-full h-dvh'>
        <DoingHeader />
        <div className='flex flex-row m-0 justify-stretch relative w-full h-dvh'>
        <DoingWordDisplay />
            <div className="bg-yellow-400 flex flex-col justify-stretch  place-items-stretch m-0 flex relative w-full h-dvh">
                <DoingForm verb={verb} />
                <VerbList verb={verb} />
            </div>
        </div>
    </main>
    )
}