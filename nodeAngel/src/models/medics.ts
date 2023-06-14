import { Schema, model } from "mongoose";

const medicsSchema = new Schema({
    fullName: String,
    dni: String,
    birthdate: String,
    specialty: String,
    phone: String,
    address: String,
    gender: String,
    id_user: String
});

export default model("medics", medicsSchema);