"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const datesSchema = new mongoose_1.Schema({
    id_patient: {
        type: mongoose_1.Schema.Types.ObjectId
    },
    id_medic: {
        type: mongoose_1.Schema.Types.ObjectId
    },
    date: String,
    reason: String,
    symptoms: String,
    status: String
});
exports.default = (0, mongoose_1.model)("dates", datesSchema);
//# sourceMappingURL=dates.js.map