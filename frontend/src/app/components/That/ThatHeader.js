import Link from "next/link"

const ThatHeader = () => {
    return (
    <div className='bg-sky-900 flex flex-row m-4 ml-0 max-h-14 justify-stretch relative w-full'>
        <div className='flex flex-row relative w-full'>
        <Link href='/they'><p className='text-sky-600 text-6xl hover:text-red-600'>They</p></Link>
        <Link href='/doing'><p className='text-sky-600 text-6xl hover:text-yellow-300'>Doing</p></Link>
            <p className='text-sky-600 text-6xl font-semibold'>That</p>
        <div className='flex flex-row justify-end mr-8 relative w-full items-center'>
        <button className='text-sky-600 text-l m-1 uppercase hover:text-black font-semibold'><Link href='/'>Home</Link></button>
            <button className='text-sky-600 text-l m-2 uppercase hover:text-black font-semibold'><Link href='/instructions'>Instructions</Link></button>
        </div>
        </div>
    </div>
    )
}

export default ThatHeader