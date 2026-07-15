import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import { verifyToken } from "@/lib/auth";

export async function PUT(request, { params }) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return Response.json({ error: "Unauthorized access: Token missing or invalid" }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    
    if (!body.status) {
      return Response.json({ error: "Missing required field: status" }, { status: 400 });
    }
    
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true, runValidators: true }
    );
    
    if (!updatedBooking) {
      return Response.json({ error: "Booking request not found" }, { status: 404 });
    }
    
    return Response.json(updatedBooking, { status: 200 });
  } catch (error) {
    console.error("Failed to update booking status:", error);
    return Response.json({ error: error.message || "Failed to update booking status" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return Response.json({ error: "Unauthorized access: Token missing or invalid" }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;
    
    const deletedBooking = await Booking.findByIdAndDelete(id);
    
    if (!deletedBooking) {
      return Response.json({ error: "Booking request not found" }, { status: 404 });
    }
    
    return Response.json({ message: "Booking deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete booking:", error);
    return Response.json({ error: error.message || "Failed to delete booking" }, { status: 500 });
  }
}
