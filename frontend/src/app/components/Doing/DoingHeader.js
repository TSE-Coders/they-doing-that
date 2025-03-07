import Link from "next/link"

const DoingHeader = () => {
    return (
        <div className='bg-yellow-700 flex flex-row m-4 max-h-14 justify-stretch relative w-full'>
            <div className='flex flex-row relative w-full'>
            <Link href='/they'><p className='text-yellow-400 text-6xl hover:text-red-600'>They</p></Link>
                <p className='text-yellow-400 text-6xl font-semibold'>Doing</p>
            <Link href='/that'><p className='text-yellow-400 text-6xl hover:text-sky-400'>That</p></Link>
            <div className='flex flex-row justify-end mr-8 relative w-full items-center'>
            <button className='text-yellow-400 text-l m-1 uppercase hover:text-black font-semibold'><Link href='/'>Home</Link></button>
                <button className='text-yellow-400 text-l m-2 uppercase hover:text-black font-semibold'><Link href='/instructions'>Instructions</Link></button>
            </div>
            </div>
        </div>
    )
}

export default DoingHeader