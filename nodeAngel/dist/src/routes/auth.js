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
const bcrypt_1 = __importDefault(require("bcrypt"));
//modelss
const Users_1 = __importDefault(require("../models/Users"));
const response_1 = require("../models/response");
const dataProfessional_1 = __importDefault(require("../models/dataProfessional"));
const medics_1 = __importDefault(require("../models/medics"));
const authRouter = (0, express_1.Router)();
authRouter.post("/loginPatient", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jsonRes = new response_1.RespondesModel();
    const { email, password } = req.body;
    const ress = yield Users_1.default.findOne({ email: email }).then((res) => {
        if (res) {
            if (res.password == password) {
                jsonRes.code = 200;
                jsonRes.message = "login success";
                jsonRes.status = true;
                jsonRes.data = res;
                return jsonRes;
            }
            else if (res.password != password && res.password != null) {
                jsonRes.code = 400;
                jsonRes.message = "password incorrecto";
                jsonRes.status = false;
                return jsonRes;
            }
        }
        else if (!res) {
            jsonRes.code = 400;
            jsonRes.message = "no existe";
            jsonRes.status = false;
            return jsonRes;
        }
    }).catch((err) => {
        console.log(err);
    });
    res.json(ress);
}));
authRouter.post("/loginMedic", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jsonRes = new response_1.RespondesModel();
    const { email, password } = req.body;
    const ress = yield Users_1.default.findOne({ email: email }).then((res) => {
        if (res) {
            if (res.password == password) {
                jsonRes.code = 200;
                jsonRes.message = "login success";
                jsonRes.status = true;
                jsonRes.data = res;
                return jsonRes;
            }
            else if (res.password != password && res.password != null) {
                jsonRes.code = 400;
                jsonRes.message = "password incorrecto";
                jsonRes.status = false;
                return jsonRes;
            }
        }
        else if (!res) {
            jsonRes.code = 400;
            jsonRes.message = "no existe";
            jsonRes.status = false;
            return jsonRes;
        }
    }).catch((err) => {
        console.log(err);
    });
    console.log(ress);
    res.json(ress);
}));
authRouter.post("/registerMedic", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jsonRes = new response_1.RespondesModel();
    const { fullName, typeDNISelected, dni, email, password, phone, address, speciality, gender, university, uniAdmissionDate, uniGraduationDate, mpps, postgrade, postgradeUniversity, postgradeGraduationDate, postgradeAdmissionDate, additional, dayService, dayService2 } = req.body;
    const saltRounds = 10;
    const hash = yield bcrypt_1.default.hash(password, saltRounds);
    console.log(hash);
    const newUser = new Users_1.default({ email, password: hash, type_user: "paciente" });
    const newMedic = new medics_1.default({ fullName, typeDNISelected, dni, phone, address, gender, speciality });
    const newDataProfessional = new dataProfessional_1.default({ university, uniAdmissionDate, uniGraduationDate, mpps, postgrade, postgradeGraduationDate, postgradeUniversity, postgradeAdmissionDate, additional, dayService, dayService2 });
    yield newUser.save().then((res) => {
        newMedic.id_user = JSON.stringify(newUser._id);
    }).catch((err) => {
        console.log(err);
    });
    yield newMedic.save().then((res) => {
        newDataProfessional.id_medic = JSON.stringify(newMedic._id);
    }).catch((err) => {
        console.log(err);
    });
    yield newDataProfessional.save();
    jsonRes.code = 200;
    jsonRes.message = "register success";
    jsonRes.status = true;
    jsonRes.data = newUser;
    res.json(jsonRes);
}));
// authRouter.get("/registerMedic", (req: Request, res: Response) => {
//     console.log("Register")
//     res.send("Register");
// });
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