import { Schema, model } from "mongoose";

const patientsSchema = new Schema({
    fullName: String,
    typeDNISelected: String,
    dni: String,
    birthdate: String,
    phone: String,
    address: String,
    gender: String,
    id_user: String
});

export default model("patients", patientsSchema);