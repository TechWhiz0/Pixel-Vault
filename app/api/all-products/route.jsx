import { db } from "@/configs/db";
import { productsTable, usersTable } from "@/configs/schema";
import { asc, desc, eq, getTableColumns, like } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { limit = 10, offset = 0, searchText = '', sort} = await req.json();
    
    // Validate sort field exists on productsTable to prevent SQL injection
    if (!productsTable[sort.field]) {
      return NextResponse.json(
        { error: "Invalid sort field" },
        { status: 400 }
      );
    }

    const result = await db
      .select({
        ...getTableColumns(productsTable),
        user: {
          name: usersTable.name,
          image: usersTable.image,
        },
      })
      .from(productsTable)
      .innerJoin(
        usersTable, 
        eq(productsTable.createdBy, usersTable.email)
      )
      .where(
        like(productsTable.title, `%${searchText}%`)
      )
      .orderBy(
        sort.order === 'desc' 
          ? desc(productsTable[sort.field]) 
          : asc(productsTable[sort.field])
      )
      .limit(Number(limit))
      .offset(Number(offset));

    return NextResponse.json(result);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" }, 
      { status: 500 }
    );
  }
}