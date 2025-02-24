import { NextResponse } from 'next/server'


export async function GET (){

   try {

    const res = await fetch(`http://localhost:/names`)       

    const data = await res.json()

    
    return NextResponse.json({ doing })

   }catch(error){console.log(error)}
}