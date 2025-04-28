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
              <main className='h-screen bg-yellow-700 flex flex-col w-full'>
                <DoingHeader />
                  <div className='h-full flex w-full'>
                  <DoingWordDisplay />
                      <div className="h-full bg-yellow-400 flex flex-col w-full">
                          <DoingForm verb={verb} />
                          <VerbList verb={verb} />
                      </div>
                  </div>
                  <DoingFooter/>
              </main>
              )
}
