import { Schema, model } from "mongoose";

const registerPatientSchema = new Schema({
    email: String,
    password: String,
    fullName: String,
    dni: String,
    birthDate: String,
    phoneNumber: String,
    address: String,
});

export default model("registerPatient", registerPatientSchema);