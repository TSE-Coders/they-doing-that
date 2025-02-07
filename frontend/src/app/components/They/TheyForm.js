'use client'
import Link from "next/link"


async function TheyPost(event){
  event.preventDefault()
  
  const theySubject = {
    name: {
      name: event.target[0].value
    }
  }
  
  console.log(`this is `, theySubject)

  try {
    const res = await fetch('/api/postName', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(theySubject)
    })
    const data = await res.json()
  } catch (error) {
    console.error(error)
  }
}



const TheyForm = () => {
    return (
        <div className='flex justify-stretch  flex-col place-items-stretch flex relative w-full h-dvh border-b-4 border-red-950'>
        <form onSubmit={TheyPost} className="flex flex-col justify-stretch w-full mt-36">
          <label id="subject" className="flex items-center gap-8">
            <input type="text" placeholder="add word here" className="input input-bordered w-full ml-20 mr-20" />
          </label>
          <button type="submit" className="btn ml-36 mr-36 mt-4 border-0 bg-red-800 rounded-full">add a subject</button>
        </form>
        <form className="flex flex-col justify-stretch w-full mt-4">
          <button type="submit" className="btn  ml-36 mr-36 mt-4 border-0 bg-red-800 rounded-full">remove a subject</button>
        </form>
        </div>
    )
}

export default TheyForm