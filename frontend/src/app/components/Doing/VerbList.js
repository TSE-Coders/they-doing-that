'use client'
const VerbList = ({verb}) => {
    return (
        <div className='bg-yellow-400 flex justify-stretch  place-items-stretch m-4 ml-0 flex relative w-full h-dvh'>
            <div className="grid grid-cols-4 gap-4 relative w-full p-6">
            {verb.map((verb) => (
                    <div key={verb.id} className='bg-yellow-600 border-yellow-700 border-4 rounded-full text-center content-center text-white uppercase font-bold'>{verb.word}</div>
                ))}
            </div>
        </div>
    )
}

export default VerbList