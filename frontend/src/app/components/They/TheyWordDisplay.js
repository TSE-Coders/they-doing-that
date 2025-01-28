'use client'
const TheyWordDisplay = () => {
    return (
        <div className="bg-red-700 flex flex-col justify-center items-center  place-items-stretch m-0 flex relative w-full h-dvh border-r-4 border-red-950">
            <p className='text-8xl text-wrap font-black text-red-950 uppercase text-center p-36'>Tori</p>
            <div className='relative m-10 mt-44 justify-center content-end'>
                <p className='text-center text-base text-sm text-red-950'>Powered by:</p>
                <p className='text-center text-base font-bold text-red-950 uppercase'>Ruby x Postgres</p>
            </div>
        </div>
    )
}
export default TheyWordDisplay