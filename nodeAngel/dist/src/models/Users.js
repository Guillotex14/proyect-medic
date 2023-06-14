"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const usersSchema = new mongoose_1.Schema({
    email: String,
    password: String,
    id_user: String,
    type_user: String
});
exports.default = (0, mongoose_1.model)("users", usersSchema);
//# sourceMappingURL=Users.js.map