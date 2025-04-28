'use client'
import Link from "next/link"


async function TheyPost(event){
  
  const theySubject = {
    name: {
      name: event.target[0].value
    }
  }
  
  console.log(`this is `, theySubject)

  try {
    const res = await fetch('/api/postName', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(theySubject)
    })
    const data = await res.json()
  } catch (error) {
    console.error(error)
  }
}

async function TheyDelete(subjects){
  //get the last element of the subjects array and delete it. 
  const lastElement = subjects.length - 1
  const subjectId = subjects[lastElement].id

  try {
    const res = await fetch(`/api/deleteName/${subjectId}`, { method: "DELETE" });
    console.log(res)

    if (!res.ok) {
      const data = await res.json();
      console.error("Error deleting:", data.error);
      return;
    }
    console.log("Deleted successfully");
    window.location.reload();
    // Update state AFTER successful delete
    //setNames((prevNames) => prevNames.filter((name) => name.id !== id));
  } catch (error) {
    console.error("Error deleting name:", error);
  }

}



const TheyForm = ({subjects}) => {
  const subjectNum = subjects.length
    return (
        <div className='h-full w-full border-b-4 border-red-950 m-0 p-0'>
          <div className="flex justify-stretch flex-col w-full mb-6">
            <form onSubmit={TheyPost} className="flex flex-col justify-stretch w-full mt-32 mb-0 p-0 ">
            <label id="subject" className="flex items-center gap-8 p-0">
              <input type="text" placeholder="add word here" className="input input-bordered w-full ml-20 mr-20 mt-0 mb-0 border-4 border-red-950" />
            </label>
            {subjectNum === 16 ?  
            <button type="submit" className="btn ml-36 mr-36 mt-4 mb-0 pb-0 border-0 bg-red-800 rounded-full cursor-not-allowed opacity-50" disabled>add a subject</button> :
            <button type="submit" className="btn ml-36 mr-36 mt-4 mb-0 pb-0 border-0 bg-red-800 rounded-full">add a subject</button>
            }
            
            </form>
          </div>
          <div className="flex flex-col justify-stretch w-full mb-24">
          {subjectNum === 0 ?  
            <button className=" btn  ml-36 mr-36 mt-0 pt-0 border-0 bg-red-800 rounded-full cursor-not-allowed opacity-75" disabled>remove a subject</button> :
            <button onClick={() => TheyDelete(subjects)} className=" btn  ml-36 mr-36 mt-0 pt-0 border-0 bg-red-800 rounded-full">remove a subject</button>
            }

          </div>
        </div>
    )
}

export default TheyForm
