import dbConnect from "@/lib/db";
import Room from "@/models/Room";
import { rooms as defaultRooms } from "@/data/rooms";

export async function GET(request) {
  try {
    await dbConnect();
    let rooms = await Room.find({});
    
    // Auto-seed if database is empty
    if (rooms.length === 0) {
      await Room.insertMany(defaultRooms);
      rooms = await Room.find({});
    }
    
    return Response.json(rooms, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch rooms:", error);
    return Response.json({ error: "Failed to fetch rooms" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Validate id exists
    if (!body.id) {
      return Response.json({ error: "Room id is required" }, { status: 400 });
    }
    
    const newRoom = await Room.create(body);
    return Response.json(newRoom, { status: 201 });
  } catch (error) {
    console.error("Failed to create room:", error);
    return Response.json({ error: error.message || "Failed to create room" }, { status: 500 });
  }
}
