'use client'
import Link from "next/link"

const DoingHome = () => {
    return (
        <div className="flex justify-center bg-yellow-200 w-full h-dvh hover:bg-yellow-300">
          <div className="m-auto mt-64 justify-items-center pb-56">
            <div className="pb-6">
              <p className='text-6xl text-wrap font-black text-yellow-700 uppercase text-center'>Doing</p>
            </div>
            <div className="justify-items-center">
            <Link href='/doing'><button className="btn btn-neutral border-0 bg-yellow-500 rounded-full">add a verb</button></Link>
            </div>
              <div className='relative m-10 mt-44 justify-center'>
                <p className='text-center text-sm text-yellow-700'>Powered by:</p>
                <p className='text-center text-base font-bold text-yellow-700 uppercase'>Python x Mongo</p>
            </div>
          </div>
        </div>
    )
}

export default DoingHome