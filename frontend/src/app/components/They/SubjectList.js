

const SubjectList = ({subjects}) => {

    return (
        <div className='h-full bg-red-700 flex m-4 ml-0 w-full'>
            <div className="grid grid-cols-4 gap-4 relative w-full p-6">
            {subjects.map((subject) => (
                    <div key={subject.id}className='bg-red-900 rounded-full border-red-950 border-4 text-center content-center text-white uppercase font-bold'>{subject.name}</div>
                ))}
            </div>
        </div>
    )
}

export default SubjectList