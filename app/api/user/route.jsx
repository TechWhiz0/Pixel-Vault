import { db } from "@/configs/db";
import { usersTable } from "@/configs/schema";
import { eq } from "drizzle-orm"; // Ensure correct import
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { user } = await req.json();

        // Validate user input
        if (!user?.primaryEmailAddress?.emailAddress || !user?.fullName) {
            return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
        }

        // Check if user already exists
        const userData = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, user.primaryEmailAddress.emailAddress));

        if (userData.length === 0) {
            // Insert new user
            const result = await db
                .insert(usersTable)
                .values({
                    name: user.fullName,
                    email: user.primaryEmailAddress.emailAddress,
                    image: user.imageUrl,
                })
                .returning(); // Returns the inserted rows
            
            return NextResponse.json(result[0], { status: 201 }); // Respond with created user data
        }

        // Return existing user data
        return NextResponse.json(userData[0], { status: 200 });
    } catch (error) {
        console.error("Error processing POST request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
