import { Schema, model } from "mongoose";

const medicalFile = new Schema({
    disease: String,
    allergy: String,
    condiction: String,
    additional: String,
    id_patient: String
});

export default model("medicalFile", medicalFile);