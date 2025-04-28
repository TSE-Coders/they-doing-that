import Link from "next/link"

const Header = () => {
    return (
        <div className='bg-black flex flex-row m-4 max-h-14 justify-stretch static w-full'>
            <div className='flex flex-row relative w-full'>
                <p className='text-red-600 text-6xl'>They</p>
                <p className='text-yellow-300 text-6xl'>Doing</p>
                <p className='text-sky-400 text-6xl'>That</p>
            </div>
        </div>
    )
}

export default Header