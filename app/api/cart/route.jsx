import { db } from "@/configs/db";
import { cartTable, productsTable } from "@/configs/schema";
import { eq, getTableColumns } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req){
    const {email,productId}=await req.json()
    const result=await db.insert(cartTable).values({
        email: email,
        productId: productId
    }).returning(cartTable)
    return NextResponse.json(result)
}

export async function GET(req){
    const {searchParams}=new URL(req.url)
    const email=searchParams.get('email')
    const result=await db.select(
    {
        ...getTableColumns(productsTable)
    }
    ).from(cartTable).innerJoin(productsTable,eq(cartTable.productId,productsTable.id)).where(eq(cartTable.email,email))

    return NextResponse.json(result)
}