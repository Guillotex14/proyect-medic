"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const codeVerificationSchema = new mongoose_1.Schema({
    code: String,
    email: String
});
exports.default = (0, mongoose_1.model)("codeVerification", codeVerificationSchema);
//# sourceMappingURL=codeVerification.js.map