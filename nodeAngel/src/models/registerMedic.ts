import { Schema, model } from "mongoose";

const registerMedicSchema = new Schema({
    email: String,
    password: String,
    fullName: String,
    dni: String,
    birthDate: String,
    specialty: String,
    phoneNumber: String,
    address: String,
    gender: String,
});

export default model("registerMedic", registerMedicSchema);