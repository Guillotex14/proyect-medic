"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.MONGO_URI = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://jefersonmujica:SkibCc1nKFNmcfb1@cluster0.luvml6n.mongodb.net/?retryWrites=true&w=majority';
exports.PORT = process.env.PORT || 3000;
