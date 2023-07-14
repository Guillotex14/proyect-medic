"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const medicsSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId
    }
});
exports.default = (0, mongoose_1.model)("medics", medicsSchema);
//# sourceMappingURL=medics.js.map