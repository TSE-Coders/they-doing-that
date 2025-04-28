'use client'

const NounList = ({nouns}) => {
    return (
        <div className='bg-red-700 flex justify-stretch  place-items-stretch m-4 ml-0 flex relative w-full h-dvh'>
            <div className="grid grid-cols-4 gap-4 relative w-full p-6">
            {nouns.map((noun) => (
                    <div key={noun.id}className='bg-red-900 rounded-full border-red-950 border-4 text-center content-center text-white uppercase font-bold'>{noun.word}</div>
                ))}
            </div>
        </div>
    )
}

export default NounList
