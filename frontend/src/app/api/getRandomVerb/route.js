import { NextResponse } from 'next/server'


export async function GET (){

   try {

    const res = await fetch(`http://localhost:8081/verb/random`)       

    const doing = await res.json()
    
    return NextResponse.json({ doing })

   }catch(error){console.log(error)}
}