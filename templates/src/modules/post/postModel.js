import mongoose, { Schema } from "mongoose";
import shortid from "../../plugins/shortid";

const PostSchema = new mongoose.Schema(
    {
        _id: { type: String, default: () => shortid(8) },
        title: { type: String, required: false },
        body: { type: String, required: true },
        userId: { type: String, ref: "User" }
    },
    { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
