import mongoose from "mongoose";
import shortid from "../../plugins/shortid";

const TokenSchema = new mongoose.Schema(
    {
        _id: { type: String, required: true, default: () => shortid(8) },
        refreshToken: { type: String, required: true },
        userId: { type: String, required: true }
    },
    { timestamps: true }
);

export default mongoose.model("Token", TokenSchema);
