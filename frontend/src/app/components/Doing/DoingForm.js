'use client'

async function DoingPost(event){
  
  const doingVerb = {
      word: event.target[0].value
  }

  const payload = JSON.stringify({doingVerb });

  try {
    const res = await fetch('/api/postVerb', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(doingVerb)
    })
    const data = await res.json()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

async function DoingDelete(verb) {
  const lastElement = verb.length - 1;
  const verbWord = verb[lastElement].word;
  console.log("Deleting verb:", verbWord);

  const payload = JSON.stringify({ word: verbWord });

  try {
    const res = await fetch(`/api/deleteVerb`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: payload,
    });
    const data = await res.json();
    if (!res.ok) {
      const data = await res.json();
      console.error("Error deleting:", data.error);
      return;
    }
    console.log("Deleted successfully");
    // Update state AFTER successful delete
    //setNames((prevNames) => prevNames.filter((name) => name.id !== id));
    window.location.reload();

  } catch (error) {
    console.error("Error deleting verb:", error);
  }
}


const DoingForm = ({verb}) => {
  const verbNum = verb.length
    return (
      <div className='h-full w-full border-b-4 border-yellow-600 m-0 p-0 '>
      <div className="flex justify-stretch flex-col w-full mb-6">
        <form onSubmit={DoingPost} className="flex flex-col justify-stretch w-full mt-32 mb-0 p-0 ">
        <label id="noun" className="flex items-center gap-8 p-0">
          <input type="text" placeholder="add word here" className="input input-bordered w-full ml-20 mr-20 mt-0 mb-0 border-4 border-yellow-600" />
        </label>
        {verbNum === 16 ?  
            <button type="submit" className="btn ml-36 mr-36 mt-4 mb-0 pb-0 border-0 bg-yellow-500 rounded-full cursor-not-allowed opacity-50" disabled>add a verb</button> :
            <button type="submit" className="btn ml-36 mr-36 mt-4 mb-0 pb-0 border-0 bg-yellow-500 rounded-full">add a verb</button>
        }
        </form>
      </div>
      <div className="flex flex-col justify-stretch w-full mb-24">
      {verbNum === 0 ?  
            <button className=" btn  ml-36 mr-36 mt-0 pt-0 border-0 bg-yellow-500 rounded-full cursor-not-allowed opacity-50" disabled>remove a verb</button> :
            <button onClick={() => DoingDelete(verb)} className=" btn  ml-36 mr-36 mt-0 pt-0 border-0 bg-yellow-500 rounded-full">remove a verb</button>
      }
      </div>
    </div>
    )
}

export default DoingForm
