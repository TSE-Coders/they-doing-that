// This is the correct syntax for the App Router in Next.js 13+
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
    const id = params.id;  // No need to await 'params', just access 'params.id' directly

    console.log(`Deleting noun with ID: ${id}`);

    try {
        const response = await fetch(`http://localhost:3000/names/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ error: errorData.error || "Failed to delete" }, { status: response.status });
        }

        return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error during DELETE request:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
