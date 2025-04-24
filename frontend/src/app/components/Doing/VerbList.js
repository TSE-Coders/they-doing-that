'use client'
const VerbList = ({verb}) => {
    console.log("this is the verb list", verb)
    return (
<div className='bg-red-700 flex justify-stretch  place-items-stretch m-4 ml-0 flex relative w-full h-dvh'>
            <div className="grid grid-cols-4 gap-4 relative w-full p-6">
            {verb.map((verb) => (
                    <div key={verb.id}className='bg-red-900 rounded-full border-red-950 border-4 text-center content-center text-white uppercase font-bold'>{verb.word}</div>
                ))}
            </div>
        </div>
    )
}

export default VerbList
