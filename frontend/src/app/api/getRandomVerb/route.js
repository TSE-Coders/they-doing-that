import { NextResponse } from 'next/server'


export async function GET (){

   try {

      // Replace the wrong endpoint with the correct one: http://localhost:8081/verb/random

    const res = await fetch(`http://localhost:8081/verb/random`)      

    const data = await res.json()
  
    return NextResponse.json({ data })

   }catch(error){console.log(error)}
}
