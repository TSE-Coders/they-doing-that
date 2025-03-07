import Link from "next/link"

const TheyHeader = () => {
    return (
        <div className='bg-red-950 flex flex-row m-4 max-h-14 justify-stretch relative w-full'>
            <div className='flex flex-row relative w-full'>
                <p className='text-red-700 text-6xl font-semibold'>They</p>
                <Link href='/doing'><p className='text-red-700 text-6xl hover:text-yellow-300'>Doing</p></Link>
                <Link href='/that'><p className='text-red-700 text-6xl hover:text-sky-400'>That</p></Link>
                <div className='flex flex-row justify-end mr-8 relative w-full items-center'>
                    <button className='text-red-700 text-l m-1 uppercase hover:text-black font-semibold'><Link href='/'>Home</Link></button>
                    <button className='text-red-700 text-l m-2 uppercase hover:text-black font-semibold'><Link href='/instructions'>Instructions</Link></button>
                 </div>
            </div>
        </div>
    )
}

export default TheyHeader