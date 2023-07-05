"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const medicalFileSchema = new mongoose_1.Schema({
    disease: String,
    allergy: String,
    condiction: String,
    additional: String,
    id_patient: {
        type: mongoose_1.Schema.Types.ObjectId
    }
});
exports.default = (0, mongoose_1.model)("medicalFile", medicalFileSchema);
//# sourceMappingURL=medicalFile.js.map