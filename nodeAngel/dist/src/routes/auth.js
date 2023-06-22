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
// import jwt from "jsonwebtoken";
const nodemailer_1 = __importDefault(require("nodemailer"));
//modelss
const Users_1 = __importDefault(require("../models/Users"));
const response_1 = require("../models/response");
const patients_1 = __importDefault(require("../models/patients"));
const dataProfessional_1 = __importDefault(require("../models/dataProfessional"));
const medics_1 = __importDefault(require("../models/medics"));
const medicalFile_1 = __importDefault(require("../models/medicalFile"));
const codeVerification_1 = __importDefault(require("../models/codeVerification"));
const authRouter = (0, express_1.Router)();
authRouter.post("/loginPatient", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jsonRes = new response_1.RespondesModel();
    const { email, password } = req.body;
    const ress = yield Users_1.default.findOne({ email: email }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(res);
        if (res) {
            const validP = yield bcrypt_1.default.compare(password, res.password);
            if (validP) {
                jsonRes.code = 200;
                jsonRes.message = "login success";
                jsonRes.status = true;
                yield patients_1.default.findOne({ id_user: res._id.toString() }).then((res2) => __awaiter(void 0, void 0, void 0, function* () {
                    console.log(res2);
                    if (res2) {
                        let patientInfo = {
                            id: res._id,
                            email: res.email,
                            typeUser: res.type_user,
                            fullName: res2.fullName,
                            typeDni: res2.typeDni,
                            dni: res2.dni,
                            birthdate: res2.birthdate,
                            phone: res2.phone,
                            address: res2.address,
                            id_patient: res2._id,
                            ensuracePlicy: res2.ensurancePolicy != "" ? res2.ensurancePolicy : "",
                            policyNumber: res2.policyNumber != "" ? res2.policyNumber : ""
                        };
                        jsonRes.data = patientInfo;
                    }
                    else {
                        jsonRes.code = 400;
                        jsonRes.message = "no existe 1";
                        jsonRes.status = false;
                        jsonRes.data = res;
                        return jsonRes;
                    }
                })).catch((err) => {
                    console.log(err);
                });
                return jsonRes;
            }
            else {
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
    })).catch((err) => {
        console.log(err);
    });
    res.json(ress);
}));
authRouter.post("/loginMedic", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jsonRes = new response_1.RespondesModel();
    const { email, password } = req.body;
    const ress = yield Users_1.default.findOne({ email: email }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
        if (res) {
            const validP = yield bcrypt_1.default.compare(password, res.password);
            if (validP) {
                jsonRes.code = 200;
                jsonRes.message = "login success";
                jsonRes.status = true;
                yield medics_1.default.findOne({ id_user: res._id }).then((res2) => {
                    if (res2) {
                        let me = {
                            id: res._id,
                            email: res.email,
                            typeUser: res.type_user,
                            fullName: res2.fullName,
                            typeDni: res2.typeDni,
                            dni: res2.dni,
                            birthdate: res2.birthdate,
                            phone: res2.phone,
                            address: res2.address,
                            id_medic: res2._id,
                            speciality: res2.specialty,
                        };
                        jsonRes.data = me;
                    }
                    else {
                        jsonRes.code = 400;
                        jsonRes.message = "no existe";
                        jsonRes.status = false;
                        jsonRes.data = res;
                        return jsonRes;
                    }
                }).catch((err) => {
                    console.log(err);
                });
                return jsonRes;
            }
            else {
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
    })).catch((err) => {
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
    const newUser = new Users_1.default({ email, password: hash, type_user: "doctor" });
    const newMedic = new medics_1.default({ fullName, typeDNISelected, dni, phone, address, gender, speciality });
    const newDataProfessional = new dataProfessional_1.default({ university, uniAdmissionDate, uniGraduationDate, mpps, postgrade, postgradeGraduationDate, postgradeUniversity, postgradeAdmissionDate, additional, dayService, dayService2 });
    yield newUser.save().then((res) => {
        newMedic.id_user = newUser._id;
    }).catch((err) => {
        console.log(err);
    });
    yield newMedic.save().then((res) => {
        newDataProfessional.id_medic = newMedic._id;
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
authRouter.post("/registerPatient", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jsonRes = new response_1.RespondesModel();
    const { fullName, typeDni, dni, email, password, phone, address, gender, diseases, alergies, condition, aditional, birthdate } = req.body;
    const saltRounds = 10;
    const hash = yield bcrypt_1.default.hash(password, saltRounds);
    const newUser = new Users_1.default({ email, password: hash, type_user: "paciente" });
    const newPatient = new patients_1.default({ fullName, typeDni, dni, birthdate, phone, address, gender });
    let stringDiseases = "";
    let stringAlergies = "";
    for (let i = 0; i < diseases.length; i++) {
        if (stringDiseases == "") {
            stringDiseases = diseases[i];
        }
        else {
            stringDiseases = stringDiseases + "," + diseases[i];
        }
    }
    for (let i = 0; i < alergies.length; i++) {
        if (stringAlergies == "") {
            stringAlergies = alergies[i];
        }
        else {
            stringAlergies = stringAlergies + "," + alergies[i];
        }
    }
    const filePatient = new medicalFile_1.default({ disease: stringDiseases, allergy: stringAlergies, condiction: condition, additional: aditional });
    yield newUser.save().then((res) => {
        newPatient.id_user = newUser._id;
    }).catch((err) => {
        console.log(err);
    });
    yield newPatient.save().then((res) => {
        filePatient.id_patient = newPatient._id;
    }).catch((err) => {
        console.log(err);
    });
    yield filePatient.save();
    jsonRes.code = 200;
    jsonRes.message = "register success";
    jsonRes.status = true;
    jsonRes.data = {};
    res.json(jsonRes);
}));
authRouter.post("/forgotPassword", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jsonResp = new response_1.RespondesModel();
    const { email } = req.body;
    const ress = yield Users_1.default.findOne({ email: email }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
        if (res) {
            jsonResp.code = 200;
            jsonResp.message = "email exist";
            jsonResp.status = true;
            const code = Math.floor(Math.random() * (9999 - 1000)) + 1000;
            const newCode = new codeVerification_1.default({ code: code, email: email });
            yield newCode.save().then((res2) => {
                const transporter = nodemailer_1.default.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'jefersonmujica@gmail.com',
                        pass: 'qtthfkossxcahyzo',
                    }
                });
                const mailOptions = {
                    from: 'AngelCare Support ',
                    to: email,
                    subject: 'codigo de verificacion',
                    text: `Tu codigo es ${code}`,
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        // console.log('Email sent: ' + info.response);
                    }
                    ;
                });
            }).catch((err) => {
                console.log(err);
            });
            jsonResp.data = {};
            return jsonResp;
        }
        else if (!res) {
            jsonResp.code = 400;
            jsonResp.message = "email not exist";
            jsonResp.status = false;
            return jsonResp;
        }
    })).catch((err) => {
        console.log(err);
    });
    console.log(ress);
    res.json(ress);
}));
authRouter.post("/verifyCode", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jsonResp = new response_1.RespondesModel();
    const { code, email } = req.body;
    const ress = yield codeVerification_1.default.findOne({ code: code, email: email }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
        if (res) {
            jsonResp.code = 200;
            jsonResp.message = "codigo verificado exitosamente";
            jsonResp.status = true;
            yield codeVerification_1.default.deleteOne({ code: code, email: email }).then((res) => {
            }).catch((err) => {
                console.log(err);
            });
            return jsonResp;
        }
        else if (!res) {
            jsonResp.code = 400;
            jsonResp.message = "codigo no valido";
            jsonResp.status = false;
            return jsonResp;
        }
    })).catch((err) => {
        console.log(err);
    });
    res.json(ress);
}));
authRouter.post("/resetPassword", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jsonResp = new response_1.RespondesModel();
    console.log(req.body);
    const { email, password } = req.body;
    const saltRounds = 10;
    const hash = yield bcrypt_1.default.hash(password, saltRounds);
    const filter = { email: email };
    const update = { password: hash };
    const ress = yield Users_1.default.findOneAndUpdate(filter, update);
    jsonResp.code = 200;
    jsonResp.message = "password reset";
    jsonResp.status = true;
    jsonResp.data = {};
    res.json(ress);
}));
exports.default = authRouter;
//# sourceMappingURL=auth.js.map