import { model, Schema } from "mongoose";

const chatSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: "userData", required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: "userData", required: true },
  messages: [
    {
      senderId: { type: Schema.Types.ObjectId, ref: "userData" },
      receiverId: { type: Schema.Types.ObjectId, ref: "userData" },
      message: String,
      timestamp: { type: Date, default: Date.now },
      status: {
        type: String,
        enum: ["sent", "delivered"],
        default: "sent",
      },
    },
  ],
});

const Chat = model("Chat", chatSchema);

export default Chat;
