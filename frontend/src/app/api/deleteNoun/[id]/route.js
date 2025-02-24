import { NextResponse } from 'next/server'

export async function DELETE (req, { params }){
        const id = params.id;
   try {
        const response = await fetch(`http://localhost:8080/names/${id}`, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        })      
        
        if (!response.ok) {
          const errorData = await response.json();
          return NextResponse.json({ error: errorData.error || "Failed to delete" }, { status: response.status });
        }
    
        return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
        
   } catch(error){
       
     return NextResponse.json({ error: "Server error" }, { status: 500 });
}
}