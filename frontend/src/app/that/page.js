"use client"
import {  useState, useEffect } from 'react'
import * as React from 'react';
import ThatHeader from '../components/That/ThatHeader';
import NounList from '../components/That/NounList';
import ThatWordDisplay from '../components/That/ThatWordDisplay';
import ThatForm from '../components/That/ThatForm';

export default function ThatPage() {

    return (
    <main className='bg-sky-900 flex flex-col m-0 justify-stretch relative w-full h-dvh'>
        <ThatHeader />
        <div className='flex flex-row m-0 justify-stretch relative w-full h-dvh'>
            <ThatWordDisplay />
            <div className="bg-sky-600 flex flex-col justify-stretch  place-items-stretch m-0 flex relative w-full h-dvh">
            <ThatForm />
            <NounList />
            </div>
        </div>
    </main>
    )
}