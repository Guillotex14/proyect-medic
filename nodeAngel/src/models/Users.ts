import { Schema, model } from "mongoose";

const usersSchema = new Schema({
    email: String,
    password: String,
    id_user: String,
    type_user: String
});

export default model("users", usersSchema);

