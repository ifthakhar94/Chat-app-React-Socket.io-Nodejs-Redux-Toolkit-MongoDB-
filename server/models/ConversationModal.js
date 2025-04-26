const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
   text:{
    type: String,
    default: "",
   },
   imageUrl:{
    type: String,
    default: "",
   },
   videoUrl:{
    type: String,
    default: "",
   },
   seen:{
    type: Boolean,
    default: false,
   },
//    sender:{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//    },
//    receiver:{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//    },
});

const conversationSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    messages:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    }],
}, { timestamps: true });

const MessageModel = mongoose.model("Message", messageSchema);
const ConversationModel = mongoose.model("Conversation", conversationSchema);
module.exports = { MessageModel, ConversationModel };