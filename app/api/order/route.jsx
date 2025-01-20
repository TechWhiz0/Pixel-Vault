import { db } from "@/configs/db";
import { cartTable, orderTable, productsTable } from "@/configs/schema";
import EmailOrder from "@/emails/email";
import { desc, eq, getTableColumns } from "drizzle-orm";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { render } from "@react-email/components"; // Ensure this is installed
import { currentUser } from "@clerk/nextjs/server";

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

// Function to handle POST requests
export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();
    const { orderDetail, email } = body;

    if (!orderDetail || !Array.isArray(orderDetail)) {
      throw new Error("Invalid orderDetail format. Expected an array.");
    }

    // Prepare the order list for database insertion
    const orderList = orderDetail.map((order) => ({
      email: email, // Use provided email for all orders
      productId: order.productId,
    }));

    // Insert orders into the database
    const result = await db.insert(orderTable).values(orderList);

    // Delete corresponding items from the cart
    const deleteResult = await db
      .delete(cartTable)
      .where(eq(cartTable.email, email));

    // Render email HTML
    const emailHtml = render(<EmailOrder orderDetail={orderDetail} />);

    // Send confirmation email
    const sendEmailResult = await sendEmail(email, emailHtml);

    // Return success response
    return NextResponse.json({
      success: true,
      result,
      deleteResult,
      emailSent: sendEmailResult,
    });
  } catch (error) {
    console.error("Error processing order:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Helper function to send email
async function sendEmail(to, emailHtml) {
  try {
    const options = {
      from: process.env.USER_EMAIL,
      to,
      subject: "Order Confirmation",
      html: emailHtml,
    };

    const info = await transporter.sendMail(options);
    console.log("Email sent: ", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error.message);
    return { success: false, error: error.message };
  }
}

//used to get user order list

export async function GET(req) {
  const user = await currentUser();
  
  if (!user || !user.primaryEmailAddress) {
    return NextResponse.json({ success: false, error: "User not authenticated." }, { status: 401 });
  }

  const result = await db
    .select({
      ...getTableColumns(productsTable),
    })
    .from(orderTable)
    .innerJoin(productsTable, eq(productsTable.id, orderTable.id))
    .where(eq(orderTable.email, user.primaryEmailAddress.emailAddress))
    .orderBy(desc(orderTable.id));
  
  return NextResponse.json( result);
}