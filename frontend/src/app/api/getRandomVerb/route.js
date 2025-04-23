import { NextResponse } from 'next/server'


export async function GET (){

   try {

      // Fix issue by updating the current endpoint with http://localhost:8081/verb/random 
    const res = await fetch(`http://localhost:/random`)       

    const that = await res.json()
    
    return NextResponse.json({ doing })

   }catch(error){console.log(error)}
}
