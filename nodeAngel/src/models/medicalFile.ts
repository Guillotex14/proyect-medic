import { Schema, model } from "mongoose";

const medicalFileSchema = new Schema({
    disease: String,
    allergy: String,
    condiction: String,
    additional: String,
    id_patient: {
        type: Schema.Types.ObjectId
    }
});

export default model("medicalFile", medicalFileSchema);