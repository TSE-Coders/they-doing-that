'use client'

const NounList = ({noun}) => {
    return (
        <div className='h-full bg-sky-600 m-4 ml-0 flex w-full'>
            <div className="grid grid-cols-4 gap-4 relative w-full p-6">
            {noun.map((noun) => (
                <div key={noun.id}className='bg-sky-900 border-sky-950 border-4 rounded-full text-center content-center text-white uppercase font-bold'>{noun.word}</div>
                ))}
            </div>
        </div>
    )
}

export default NounList
