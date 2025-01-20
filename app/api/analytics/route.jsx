import { db } from "@/configs/db"; // Ensure db is imported
import { orderTable, productsTable, usersTable } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
    
  try {
    // Await currentUser to ensure the user data is fetched
    const user = await currentUser();

    // Check if the user is authenticated
    if (!user?.primaryEmailAddress?.emailAddress) {
      return NextResponse.json({ success: false, error: "User not authenticated" }, { status: 401 });
    }

    // Fetch the orders with product and user details
    const result = await db
      .select()
      .from(orderTable)
      .innerJoin(productsTable, eq(orderTable.productId, productsTable.id))
      .innerJoin(usersTable, eq(usersTable.email, productsTable.createdBy))
      .where(eq(usersTable.email, user.primaryEmailAddress.emailAddress));

    // Return the result as the response
    return NextResponse.json({ success: true, data: result });

  } catch (e) {
    console.error("Error fetching order data:", e);
    return NextResponse.json({ success: false, error: "Failed to fetch order data" }, { status: 500 });
  }
}
