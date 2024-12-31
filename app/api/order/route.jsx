import { db } from "@/configs/db";
import { cartTable, orderTable } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        // Parse the request body
        const body = await req.json(); // Use req.json() to parse JSON in Next.js API routes
        const { orderDetail, email } = body;

        if (!orderDetail || !Array.isArray(orderDetail)) {
            throw new Error("Invalid orderDetail format. Expected an array.");
        }

        let orderList = [];
        orderDetail.forEach((order) => {
            orderList.push({
                email: order.email,
                productId: order.productId,
            });
        });

        // Insert orders into the database
        const result = await db.insert(orderTable).values(orderList);

        // Delete the corresponding items from the cart
        const deleteResult = await db.delete(cartTable).where(eq(cartTable.email, email));

        // Return the response
        return NextResponse.json({ success: true, result, deleteResult });
    } catch (error) {
        console.error("Error processing order:", error.message);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
