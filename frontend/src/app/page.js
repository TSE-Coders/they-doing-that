"use client"
import * as React from 'react';
import Header from './components/Header';
import TheyHome from './components/They/TheyHome';
import DoingHome from './components/Doing/DoingHome';
import ThatHome from './components/That/ThatHome';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <main className='bg-black flex flex-col m-0 justify-stretch relative w-full h-dvh'>
      <Header />
      <div className="flex justify-stretch  place-items-stretch m-0 flex relative w-full h-dvh">
        <TheyHome />
        <DoingHome />
        <ThatHome />
      </div>
      <Footer />
    </main>
  )
};