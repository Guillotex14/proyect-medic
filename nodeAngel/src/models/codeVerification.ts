import { Schema, model } from "mongoose";

const codeVerificationSchema = new Schema({
    code: String,
    email: String
});

export default model("codeVerification", codeVerificationSchema);