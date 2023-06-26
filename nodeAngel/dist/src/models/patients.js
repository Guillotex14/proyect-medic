"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const patientsSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId
    }
});
exports.default = (0, mongoose_1.model)("patients", patientsSchema);
//# sourceMappingURL=patients.js.map