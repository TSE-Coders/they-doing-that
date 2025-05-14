

import { NextResponse } from 'next/server'


export async function GET (){

   try {

    const res = await fetch(`http://localhost:8080/noun/random`)       

    const that = await res.json()
    
    return NextResponse.json({ that })

   }catch(error){console.log(error)}
}
