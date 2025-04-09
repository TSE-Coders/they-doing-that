"use client"
import * as React from 'react';
import Header from './components/Header';
import TheyHome from './components/They/TheyHome';
import DoingHome from './components/Doing/DoingHome';
import ThatHome from './components/That/ThatHome';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <main className='bg-black relative h-screen w-full'>
      <div className='flex flex-col relative h-screen w-full'>
      <Header />
      <div className="flex h-full justify-stretch w-full">
        <TheyHome />
        <DoingHome />
        <ThatHome />
      </div>
      <Footer />
      </div>
      
    </main>
  );
}
