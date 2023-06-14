"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const medicsSchema = new mongoose_1.Schema({
    fullName: String,
    dni: String,
    birthdate: String,
    specialty: String,
    phone: String,
    address: String,
    gender: String,
    id_user: String
});
exports.default = (0, mongoose_1.model)("medics", medicsSchema);
//# sourceMappingURL=medics.js.map