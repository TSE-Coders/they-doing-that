
export async function DELETE (id){
   try {
        const response = await fetch(`http://localhost:3000/names/${id}`, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
          },
        })      
        
        console.log('Deleted successfully');
        
   } catch(error){
       
        console.log(error)
}
}