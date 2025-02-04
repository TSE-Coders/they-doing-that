import { NextResponse } from 'next/server'


export async function GET (){

   try {

    const res = await fetch(`http://localhost:8081/verb/random`)       

    const verb = await res.json()

    
    return NextResponse.json({ verb })

   }catch(error){console.log(error)}
}