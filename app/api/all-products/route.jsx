import { db } from "@/configs/db";
import { productsTable, usersTable } from "@/configs/schema";
import { desc, eq, getTableColumns, like } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
      const { limit,offset,searchText } = await req.json();
      console.log("Limit received:", limit);
  
      const result = await db
        .select({
          ...getTableColumns(productsTable),
          user: {
            name: usersTable.name,
            image: usersTable.image,
          },
        })
        .from(productsTable)
        .innerJoin(usersTable, eq(productsTable.createdBy, usersTable.email))
        .orderBy(desc(productsTable.id))
        .limit(Number(limit)).offset(offset).where(like(productsTable.title,'%'+searchText+'%'))
  
      console.log("Query result:", result);
      return NextResponse.json(result);
    } catch (error) {
      console.error("API Error:", error);
      return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
  }
  