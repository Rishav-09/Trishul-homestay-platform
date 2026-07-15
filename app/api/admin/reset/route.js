import dbConnect from "@/lib/db";
import Room from "@/models/Room";
import Booking from "@/models/Booking";
import Inquiry from "@/models/Inquiry";
import { rooms as defaultRooms } from "@/data/rooms";
import { verifyToken } from "@/lib/auth";

const seedBookings = [
  {
    guestName: "Rohit Sharma",
    email: "rohit@gmail.com",
    phone: "+91 9988776655",
    roomTitle: "Deluxe Himalayan View Suite",
    roomPrice: 3500,
    checkIn: new Date("2026-06-21"),
    checkOut: new Date("2026-06-24"),
    guests: "2",
    nights: 3,
    totalAmount: 11025,
    status: "Pending Approval",
  },
  {
    guestName: "Meera Nair",
    email: "meera@outlook.com",
    phone: "+91 8877665544",
    roomTitle: "Family Eco-Cottage",
    roomPrice: 5000,
    checkIn: new Date("2026-06-25"),
    checkOut: new Date("2026-06-27"),
    guests: "4",
    nights: 2,
    totalAmount: 10500,
    status: "Approved",
  },
  {
    guestName: "David Cole",
    email: "david@yahoo.com",
    phone: "+1 415-888-0099",
    roomTitle: "Standard Eco-Room",
    roomPrice: 2500,
    checkIn: new Date("2026-07-02"),
    checkOut: new Date("2026-07-06"),
    guests: "1",
    nights: 4,
    totalAmount: 10500,
    status: "Rejected",
  }
];

const seedInquiries = [
  {
    name: "Sanjay Dutta",
    email: "sanjay.d@live.com",
    phone: "+91 9944332211",
    subject: "Trekking Guide Request",
    message: "Need a certified local guide for Chandrashila Peak trek on June 22. We are a group of 3 hikers. Let us know guide rates.",
  },
  {
    name: "Alice Johnson",
    email: "alice@gmail.com",
    phone: "+44 7700 900077",
    subject: "Winter Road Conditions",
    message: "We plan to drive from Rishikesh to Chopta in mid-January. Are snow chains required for tires? Let us know.",
  }
];

export async function POST(request) {
  try {
    const user = verifyToken(request);
    if (!user || user.role !== "admin") {
      return Response.json({ error: "Unauthorized access: Administrator privileges required" }, { status: 401 });
    }

    await dbConnect();
    
    // Purge collections
    await Room.deleteMany({});
    await Booking.deleteMany({});
    await Inquiry.deleteMany({});
    
    // Insert fresh seed data
    await Room.insertMany(defaultRooms);
    await Booking.insertMany(seedBookings);
    await Inquiry.insertMany(seedInquiries);
    
    return Response.json({ message: "Database reset and seeded successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Failed to reset database:", error);
    return Response.json({ error: error.message || "Failed to reset database" }, { status: 500 });
  }
}
