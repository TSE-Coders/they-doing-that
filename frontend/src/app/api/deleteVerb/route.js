import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { word } = await request.json();
    console.log("Deleting ID:", word);

    const response = await fetch('http://localhost:8081/verb/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ word:word }) 
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
