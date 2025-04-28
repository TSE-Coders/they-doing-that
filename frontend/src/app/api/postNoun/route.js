// this should post to the 
import { NextResponse } from 'next/server'


export async function POST (request){
    const theySubject = await request.json()
    console.log(theySubject)

   try {

        const response = await fetch('http://localhost:8080/noun', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(theySubject)
        })      

        const data = await response.json()

        console.log(`response from POST request`, data)

        
        return NextResponse.json({ data })

   }catch(error){
    console.log(error)
}
}
