import { Schema, model } from "mongoose";

const datesSchema = new Schema({
    id_patient: {
        type: Schema.Types.ObjectId
    },
    id_medic: {
        type: Schema.Types.ObjectId
    },
    date: String,
    reason: String,
    symptoms: String,
    status: String
});

export default model("dates", datesSchema);