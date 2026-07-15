import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import { verifyToken } from "@/lib/auth";

export async function GET(request) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return Response.json({ error: "Unauthorized access: Token missing or invalid" }, { status: 401 });
    }

    await dbConnect();
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    return Response.json(bookings, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return Response.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Required field checks
    const required = ["guestName", "email", "phone", "roomTitle", "roomPrice", "checkIn", "checkOut", "guests", "nights", "totalAmount"];
    for (const field of required) {
      if (body[field] === undefined) {
        return Response.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }
    
    const newBooking = await Booking.create(body);
    return Response.json(newBooking, { status: 201 });
  } catch (error) {
    console.error("Failed to create booking:", error);
    return Response.json({ error: error.message || "Failed to submit booking request" }, { status: 500 });
  }
}
