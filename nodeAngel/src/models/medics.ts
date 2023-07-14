import { Schema, model } from "mongoose";

const medicsSchema = new Schema({
    fullName: String,
    typeDni: String,
    dni: String,
    birthdate: String,
    speciality: String,
    phone: String,
    address: String,
    city: String,
    gender: String,
    id_user: {
        type: Schema.Types.ObjectId
    }
});

export default model("medics", medicsSchema);