import { Schema, model } from "mongoose";

const dataProfessionalSchema = new Schema({
    university: String,
    uniAdmissionDate: String,
    uniGraduationDate: String,
    mpps: String,
    postgrade: String,
    postgradeUniversity: String,
    postgradeAdmissionDate: String,
    postgradeGraduationDate: String,
    dayService: String,
    dayService2: String,
    files: String,
    additional: String,
    id_medic: String
});

export default model("dataProfessional", dataProfessionalSchema);