import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const conversationSchema = new Schema({
    members: {
        type: Array,
    },

}
)

export default mongoose.model("Conversation", conversationSchema);