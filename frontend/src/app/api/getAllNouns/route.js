import { NextResponse } from 'next/server'


export async function GET (){

   try {

    const res = await fetch(`http://localhost:8080/names`)       

    const data = await res.json()

    
    return NextResponse.json({ noun })

   }catch(error){console.log(error)}
}