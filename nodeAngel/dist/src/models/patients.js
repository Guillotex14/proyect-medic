"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const patientsSchema = new mongoose_1.Schema({
    fullName: String,
    typeDNISelected: String,
    dni: String,
    birthdate: String,
    phone: String,
    address: String,
    gender: String,
    id_user: String
});
exports.default = (0, mongoose_1.model)("patients", patientsSchema);
//# sourceMappingURL=patients.js.map