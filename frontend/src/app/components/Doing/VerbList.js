'use client'
const VerbList = ({verb}) => {
    return (
        <div className='h-full bg-yellow-400 m-4 ml-0 flex w-full'>
            <div className="grid grid-cols-4 gap-4 relative w-full p-6">
            {verb.map((verb) => (
                    <div key={verb.id} className='bg-yellow-600 border-yellow-700 border-4 rounded-full text-center content-center text-white uppercase font-bold'>{verb.word}</div>
                ))}
            </div>
        </div>
    )
}

export default VerbList