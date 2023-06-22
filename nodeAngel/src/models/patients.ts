import { Schema, model } from "mongoose";

const patientsSchema = new Schema({
    fullName: String,
    typeDni: String,
    dni: String,
    birthdate: String,
    phone: String,
    address: String,
    gender: String,
    ensurancePolicy: String,
    policyNumber: String,
    id_user: {
        type: Schema.Types.ObjectId
    }
});

export default model("patients", patientsSchema);