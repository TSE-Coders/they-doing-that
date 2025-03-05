"use client"
import {  useState, useEffect } from 'react'
import * as React from 'react';
import DoingHeader from '../components/Doing/DoingHeader';
import VerbList from '../components/Doing/VerbList';
import DoingWordDisplay from '../components/Doing/DoingWordDisplay';
import DoingForm from '../components/Doing/DoingForm';
import DoingFooter from '../components/Doing/DoingFooter';


export default function DoingPage() {
    const [verb, setVerb] = useState([]);
    const doingArray = [{word:"eat", id: 1}, {word:"walk", id: 2}, {word: "swim", id: 3}, {word: "write", id: 4}, {word: "code", id: 5}, {word:"drive", id: 6}, {word:"race", id: 7}, {word: "drink", id: 8}, {word: "watch", id: 9}, {word: "blink", id: 10}, {word:"think", id: 11}, {word:"run", id: 12}, {word: "stare", id: 13}, {word: "play", id: 14}, {word: "clean", id: 15}]
        
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
                        setVerb(doingArray);
                      }
                    } catch (error) {
                      console.error("Error fetching name:", error);
                      setVerb(doingArray);
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
        <DoingFooter/>
    </main>
    )
}