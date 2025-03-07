'use client'

async function ThatPost(event){
  
  const thatNoun = {
    name: {
      name: event.target[0].value
    }
  }
  
  console.log(`this is `, thatNoun)

  try {
    const res = await fetch('/api/postNoun', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(thatNoun)
    })
    const data = await res.json()
  } catch (error) {
    console.error(error)
  }
}

async function ThatDelete(noun){
  //get the last element of the subjects array and delete it. 
  const lastElement = noun.length - 1
  const nounId = noun[lastElement].id

  try {
    const res = await fetch(`/api/deleteNoun/${nounId}`, { method: "DELETE" });
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
    console.error("Error deleting noun:", error);
  }

}


const ThatForm = ({noun}) => {
  const nounNum = noun.length
    return (
      <div className='h-full w-full border-b-4 border-sky-900 m-0 p-0'>
      <div className="flex justify-stretch flex-col w-full mb-6">
        <form onSubmit={ThatPost} className="flex flex-col justify-stretch w-full mt-32 mb-0 p-0 ">
        <label id="noun" className="flex items-center gap-8 p-0">
          <input type="text" placeholder="add word here" className="input input-bordered w-full ml-20 mr-20 mt-0 mb-0 border-4 border-sky-900" />
        </label>
        {nounNum === 16 ?  
            <button type="submit" className="btn ml-36 mr-36 mt-4 mb-0 pb-0 border-0 bg-sky-700 rounded-full cursor-not-allowed opacity-50" disabled>add a noun</button> :
            <button type="submit" className="btn ml-36 mr-36 mt-4 mb-0 pb-0 border-0 bg-sky-700 rounded-full">add a noun</button>
        }
        </form>
      </div>
      <div className="flex flex-col justify-stretch w-full mb-24">
      {nounNum === 0 ?  
            <button className=" btn  ml-36 mr-36 mt-0 pt-0 border-0 bg-sky-700 rounded-full cursor-not-allowed opacity-50" disabled>remove a noun</button> :
            <button onClick={() => ThatDelete(noun)} className=" btn  ml-36 mr-36 mt-0 pt-0 border-0 bg-sky-700 rounded-full">remove a noun</button>
      }
      </div>
    </div>
    )
}

export default ThatForm