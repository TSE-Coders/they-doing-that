"use client"
import {  useState, useEffect } from 'react'
import * as React from 'react';
import TheyHeader from '../components/They/TheyHeader';
import TheyWordDisplay from '../components/They/TheyWordDisplay';
import SubjectList from '../components/They/SubjectList';
import TheyForm from '../components/They/TheyForm';

export default function TheyPage() {
    const [subjects, setSubject] = useState([]);

    useEffect(() => {
        async function fetchAllNames() {
            try {
              const res = await fetch(`/api/getAllNames`);
              if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status} API unreachable`);
              }
          
              const payload = await res.json();
              if (payload && payload.data) {
                setSubject(payload.data);
              } else {
                setSubject({ name: "no data available" });
              }
            } catch (error) {
              console.error("Error fetching name:", error);
              setSubject({ name: "no data available" });
            }
          }
          fetchAllNames()
    }, [])

    return (
    <main className='bg-red-950 flex flex-col m-0 justify-stretch relative w-full h-dvh'>
        <TheyHeader />
        <div className='flex flex-row m-0 justify-stretch relative w-full h-dvh'>
            <TheyWordDisplay />
            <div className="bg-red-700 flex flex-col justify-stretch  place-items-stretch m-0 flex relative w-full h-dvh">
            <TheyForm />
            <SubjectList subjects={subjects}/>
            </div>
        </div>
    </main>
    )
}