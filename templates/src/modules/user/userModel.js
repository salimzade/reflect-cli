import { model, Schema } from "mongoose";
import shortid from "../../plugins/shortid";

const UserSchema = new Schema(
    {
        _id: { type: String, required: true, default: () => shortid(8) },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true }
    },
    { timestamps: true }
);

export default model("User", UserSchema);
