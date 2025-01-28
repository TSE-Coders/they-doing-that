"use client"
import {  useState, useEffect } from 'react'
import * as React from 'react';
import DoingHeader from '../components/Doing/DoingHeader';
import VerbList from '../components/Doing/VerbList';
import DoingWordDisplay from '../components/Doing/DoingWordDisplay';
import DoingForm from '../components/Doing/DoingForm';


export default function DoingPage() {

    return (
    <main className='bg-yellow-700 flex flex-col m-0 justify-stretch relative w-full h-dvh'>
        <DoingHeader />
        <div className='flex flex-row m-0 justify-stretch relative w-full h-dvh'>
        <DoingWordDisplay />
            <div className="bg-yellow-400 flex flex-col justify-stretch  place-items-stretch m-0 flex relative w-full h-dvh">
                <DoingForm />
                <VerbList />
            </div>
        </div>
    </main>
    )
}