import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    capacity: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 5.0,
    },
    reviewsCount: {
      type: Number,
      required: true,
      default: 0,
    },
    amenities: {
      type: [String],
      default: [],
    },
    viewType: {
      type: String,
      required: true,
    },
    bedType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Room || mongoose.model("Room", RoomSchema);
