"use client"
import {  useState, useEffect } from 'react'
import * as React from 'react';
import ThatHeader from '../components/That/ThatHeader';
import NounList from '../components/That/NounList';
import ThatWordDisplay from '../components/That/ThatWordDisplay';
import ThatForm from '../components/That/ThatForm';
import ThatFooter from '../components/That/ThatFooter';

export default function ThatPage() {
    const [noun, setNoun] = useState([]);
    const thatArray = [{word:"highway", id: 1}, {word:"lake", id: 2}, {word: "restaurant", id: 3}, {word: "table", id: 4}, {word: "computer", id: 5 }, {word:"book", id: 6}, {word:"shoebox", id: 7}, {word: "blanket", id: 8}, {word: "tv", id: 9}, {word: "hospital", id: 10}, {word:"car", id: 11}, {word:"cake", id: 12}, {word: "bus", id: 13}, {word: "house", id: 14}, {word: "vegetable", id: 15}]
    
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
                    setNoun(thatArray);
                  }
                } catch (error) {
                  console.error("Error fetching name:", error);
                  setNoun(thatArray);
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
            <ThatForm noun={noun}/>
            <NounList noun={noun}/>
            </div>
        </div>
        <ThatFooter/>
    </main>
    )
}