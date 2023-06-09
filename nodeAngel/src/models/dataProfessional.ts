import { Schema, model } from "mongoose";

const dataProfessionalSchema = new Schema({
    university: String,
    uni_admission_date: String,
    uni_graduation_date: String,
    MPPS: String,
    postgrade: String,
    portgrade_university: String,
    postgrade_admission_date: String,
    postgrade_graduation_date: String,
    days_of_service: String,
    files: String,
    additional: String
});

export default model("dataProfessional", dataProfessionalSchema);