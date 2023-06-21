"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dataProfessionalSchema = new mongoose_1.Schema({
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
    id_medic: {
        type: mongoose_1.Schema.Types.ObjectId
    }
});
exports.default = (0, mongoose_1.model)("dataProfessional", dataProfessionalSchema);
//# sourceMappingURL=dataProfessional.js.map