"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//modelss
const Users_1 = __importDefault(require("../models/Users"));
const authRouter = (0, express_1.Router)();
authRouter.get("/loginPatient", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { email, password } = req.body;
    const ress = yield Users_1.default.findOne({ email: email }).then((res) => {
        if (res) {
            if (res.password == password) {
                return "login exitoso";
            }
            else if (res.password != password && res.password != null) {
                return "password incorrecto";
            }
            return res;
        }
        else if (!res) {
            return "no existe";
        }
    }).catch((err) => {
        console.log(err);
    });
    console.log(ress);
    res.send("loginPatient");
}));
authRouter.get("/loginMedic", (req, res) => {
    console.log("loginMedic");
    res.send("loginMedic");
});
authRouter.get("/register", (req, res) => {
    console.log("Register");
    res.send("Register");
});
authRouter.get("/forgotPassword", (req, res) => {
    console.log("forgotPassword");
    res.send("forgotPassword");
});
authRouter.get("/verifyCode", (req, res) => {
    console.log("verifyCode");
    res.send("verifyCode");
});
authRouter.get("/resetPassword", (req, res) => {
    console.log("resetPassword");
    res.send("resetPassword");
});
exports.default = authRouter;
//# sourceMappingURL=auth.js.map