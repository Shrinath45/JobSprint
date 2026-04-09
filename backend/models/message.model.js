import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Message", messageSchema);
