import { db } from "@/configs/db";
import { storage } from "@/configs/firebaseConfig";
import { productsTable, usersTable } from "@/configs/schema";
import { desc, eq, getTableColumns } from "drizzle-orm";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Extract formData from the request
    const formData = await req.formData();

    // Get fields and files
    const image = formData.get("image");
    const file = formData.get("file");
    const data = JSON.parse(formData.get("data"));

    console.log("Image:", image);
    console.log("File:", file);
    console.log("Data:", data);

    // Save image and file to Firebase storage (mocked here)
    const imageName=Date.now()+".png";
    const storageref=ref(storage,"file/"+imageName)
    await uploadBytes(storageref,image).then(snapshot=>{
        console.log("Image Upload !!!");
    })
    // const imageUrl = await saveToFirebase(image); // Mock function
    // const fileUrl = await saveToFirebase(file); // Mock function
    const imageUrl=await getDownloadURL(storageref)


    const fileName=Date.now().toString()
    const storageFileRef=ref(storage,"file/"+fileName);
    await uploadBytes(storageFileRef,file).then(snapshot=>{
        console.log("File Upload !!!");
    })

    const fileUrl=await getDownloadURL(storageFileRef)
    const result=await db.insert(productsTable).values({
        title:data?.title,
        category:data?.category,
        description:data?.description,
        fileUrl:fileUrl,
        imageUrl:imageUrl,
        price:data?.price,
        about:data?.about,
        message:data?.message,
        createdBy:data?.userEmail
    }).returning(productsTable)
    // Save product details to the database
    // Example: await db.collection("products").insertOne({ ...data, imageUrl, fileUrl });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error processing form data:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}


export async function GET(req){

    const {searchParams}=new URL(req.url)
    const email=searchParams.get("email")
    const result=await db.select({
        ...getTableColumns(productsTable),
        user:{
            name:usersTable.name,
            image:usersTable.image
        }
    }).from(productsTable).innerJoin(usersTable,eq(productsTable.createdBy,usersTable.email)).where(eq(productsTable.createdBy,email)).orderBy(desc(productsTable.id))
    console.log(result);

    return NextResponse.json(result)
}
