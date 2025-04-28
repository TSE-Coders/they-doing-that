"use client"
import {  useState, useEffect } from 'react'
import * as React from 'react';
import ThatHeader from '../components/That/ThatHeader';
import NounList from '../components/That/NounList';
import ThatWordDisplay from '../components/That/ThatWordDisplay';
import ThatForm from '../components/That/ThatForm';
import ThatFooter from '../components/That/ThatFooter';

export default function ThatPage() {
    const [nouns, setNoun] = useState([]);
    
        useEffect(() => {
            async function fetchAllNouns() {
                try {
                  const res = await fetch(`/api/getAllNouns`);
                  if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status} API unreachable`);
                  }
              
                  const payload = await res.json();

                  if (payload && payload.data) {
                    setNoun(payload.data);
                  } else {
                    setNoun({ word: "no data available" });
                  }
                } catch (error) {
                  console.error("Error fetching name:", error);
                  setNoun({ word: "no data available" });
                }
              }
              fetchAllNouns()
        }, [])
    

        return (
          <main className='h-screen bg-sky-900 flex flex-col w-full '>
              <ThatHeader />
              <div className='h-screen flex w-full'>
                  <ThatWordDisplay/>
                  <div className="h-full bg-sky-600 flex flex-col w-full">
                  <ThatForm noun={nouns}/>
                  <NounList noun={nouns}/>
                  </div>
              </div>
              <ThatFooter/>
          </main>
          )
}
