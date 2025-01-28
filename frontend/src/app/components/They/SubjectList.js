

const SubjectList = ({subjects}) => {

    return (
        <div className='bg-red-700 flex justify-stretch  place-items-stretch m-4 ml-0 flex relative w-full h-dvh'>
            <div className="grid grid-cols-4 gap-4 relative w-full p-6">
            {subjects.map((subject) => (
                    <div className='bg-red-950 rounded-full text-center content-center text-white uppercase font-bold'>{subject.name}</div>
                ))}
            </div>
        </div>
    )
}

export default SubjectList