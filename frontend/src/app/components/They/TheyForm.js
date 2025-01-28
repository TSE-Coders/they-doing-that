'use client'
import Link from "next/link"

const TheyForm = () => {
    return (
        <div className='flex justify-stretch  place-items-stretch m-auto flex relative w-full h-dvh border-b-4 border-red-950'>
        <form className="flex flex-col justify-stretch w-full m-auto">
          <label className="flex items-center gap-8">
            <input type="text" placeholder="add word here" className="input input-bordered w-full ml-20 mr-20" />
          </label>
          <button className="btn  ml-36 mr-36 mt-4 border-0 bg-red-800 rounded-full">add a subject</button>
          <button className="btn  ml-36 mr-36 mt-4 border-0 bg-red-800 rounded-full">remove a subject</button>
        </form>
        </div>
    )
}

export default TheyForm