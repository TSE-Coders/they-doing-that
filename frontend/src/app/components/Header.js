import Link from "next/link"

const Header = () => {
    return (
        <div className='bg-black flex flex-row m-4 max-h-14 justify-stretch relative w-full'>
            <div className='flex flex-row relative w-full'>
                <p className='text-red-600 text-6xl'>They</p>
                <p className='text-yellow-200 text-6xl'>Doing</p>
                <p className='text-sky-400 text-6xl'>That</p>
                <div className='flex flex-row justify-end mr-8 relative w-full items-center'>
                    <button className='text-white text-l m-1 uppercase hover:bg-slate-900'><Link href='/'>Home</Link></button>
                    <button className='text-white text-l m-2 uppercase hover:bg-slate-900'><Link href='/instructions'>Instructions</Link></button>
                </div>
            </div>
        </div>
    )
}

export default Header