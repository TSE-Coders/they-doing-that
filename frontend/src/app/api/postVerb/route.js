// this should post to the 
import { NextResponse } from 'next/server'


export async function POST (request){
    const doingVerb = await request.json()
    console.log(doingVerb)

   try {

        const response = await fetch('http://localhost:8081/verb', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(doingVerb)
        })      

        const data = await response.json()

        console.log(`response from POST request`, data)

        
        return NextResponse.json({ data })

   }catch(error){
    console.log(error)
}
}