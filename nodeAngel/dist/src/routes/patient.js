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
const response_1 = require("../models/response");
const Users_1 = __importDefault(require("../models/Users"));
const patients_1 = __importDefault(require("../models/patients"));
// import moment from "moment";
const dates_1 = __importDefault(require("../models/dates"));
const medics_1 = __importDefault(require("../models/medics"));
const dataProfessional_1 = __importDefault(require("../models/dataProfessional"));
const patientRouter = (0, express_1.Router)();
patientRouter.get("/allMedics", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jsonRes = new response_1.RespondesModel();
    let araryMedics = [];
    let arrayInfoMedics = [];
    let dataProf = [];
    const ress = yield Users_1.default.find({ type_user: "doctor" }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
        if (res) {
            for (let i = 0; i < res.length; i++) {
                yield medics_1.default.find({ id_user: res[i]._id }).then((res2) => {
                    if (res2) {
                        res2.forEach((element) => {
                            arrayInfoMedics.push(element);
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
            for (let i = 0; i < arrayInfoMedics.length; i++) {
                yield dataProfessional_1.default.find({ id_medic: arrayInfoMedics[i]._id }).then((res3) => {
                    if (res3) {
                        res3.forEach((element) => {
                            dataProf.push(element);
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
            for (let j = 0; j < arrayInfoMedics.length; j++) {
                for (let k = 0; k < dataProf.length; k++) {
                    if (arrayInfoMedics[j]._id.toString() == dataProf[k].id_medic.toString()) {
                        let infoMedic = {
                            id_medic: arrayInfoMedics[j]._id,
                            id_user: arrayInfoMedics[j].id_user,
                            fullName: arrayInfoMedics[j].fullName,
                            typeDni: arrayInfoMedics[j].typeDni,
                            dni: arrayInfoMedics[j].dni,
                            birthdate: arrayInfoMedics[j].birthdate,
                            address: arrayInfoMedics[j].address,
                            city: arrayInfoMedics[j].city,
                            phone: arrayInfoMedics[j].phone,
                            speciality: arrayInfoMedics[j].speciality,
                            university: dataProf[k].university,
                            uniAdmissionDate: dataProf[k].uniAdmissionDate,
                            uniGraduationDate: dataProf[k].uniGraduationDate,
                            postgrade: dataProf[k].postgrade,
                            postgradeUniversity: dataProf[k].postgradeUniversity,
                            postgradeAdmissionDate: dataProf[k].postgradeAdmissionDate,
                            postgradeGraduationDate: dataProf[k].postgradeGraduationDate,
                            dayService: dataProf[k].dayService,
                            dayService2: dataProf[k].dayService2,
                            additional: dataProf[k].additional,
                        };
                        araryMedics.push(infoMedic);
                    }
                }
            }
            jsonRes.code = 200;
            jsonRes.message = "medicos";
            jsonRes.status = true;
            jsonRes.data = araryMedics;
            return jsonRes;
        }
        else if (!res) {
            jsonRes.code = 400;
            jsonRes.message = "no hay medicos";
            jsonRes.status = false;
            return jsonRes;
        }
    })).catch((err) => {
        console.log(err);
    });
    res.json(jsonRes);
}));
patientRouter.post("/updateProfile", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jsonRes = new response_1.RespondesModel();
    const { id, fullName, email, phone, typeDni, dni, address, ensurancePolicy, policyNumber, gender, birthdate } = req.body;
    const id_user = { id_user: id };
    const _id = { _id: id };
    const update_user = { email: email };
    let id_patient = "";
    console.log(req.body);
    yield Users_1.default.findOneAndUpdate(_id, update_user);
    yield patients_1.default.findOneAndUpdate(id_user, {
        fullName: fullName,
        phone: phone,
        typeDni: typeDni,
        dni: dni,
        address: address,
        ensurancePolicy: ensurancePolicy,
        policyNumber: policyNumber,
        gender: gender,
        birthdate: birthdate
    }).then((res) => {
        console.log(res);
        if (res) {
            id_patient = res._id.toString();
        }
    }).catch((err) => {
        console.log(err);
    });
    // let me = {
    //     id: id,
    //     id_patient: id_patient,
    //     fullName: fullName,
    //     email: email,
    //     phone: phone,
    //     typeDni: typeDni,
    //     dni: dni,
    //     address: address,
    //     ensurancePolicy: ensurancePolicy,
    //     policyNumber: policyNumber,
    //     gender: gender,
    //     birthdate: birthdate,
    //     typeUser: "patient"
    // }
    jsonRes.code = 200;
    jsonRes.message = "actualizado";
    jsonRes.status = true;
    res.json(jsonRes);
}));
patientRouter.post("/createDate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jsonRes = new response_1.RespondesModel();
    const { id_patient, id_medic, reason, symptoms, date } = req.body;
    let symptomsString = "";
    symptoms.forEach((element) => {
        if (symptomsString.length == 0) {
            symptomsString = element;
        }
        else {
            symptomsString = symptomsString + element + ", ";
        }
    });
    const newDate = new dates_1.default({
        id_patient: id_patient,
        id_medic: id_medic,
        date: date,
        reason: reason,
        symptoms: symptomsString,
        status: "pendiente"
    });
    yield newDate.save();
    jsonRes.code = 200;
    jsonRes.message = "cita creada";
    jsonRes.status = true;
    res.json(jsonRes);
}));
patientRouter.post("/verifyAccessToken", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jsonRes = new response_1.RespondesModel();
    const { id_patient } = req.body;
    const ress = yield patients_1.default.findOne({ _id: id_patient }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
        if (res) {
            jsonRes.code = 200;
            jsonRes.message = "paciente";
            jsonRes.status = true;
            jsonRes.data = res;
            return jsonRes;
        }
        else {
            jsonRes.code = 400;
            jsonRes.message = "no hay token";
            jsonRes.status = false;
            return jsonRes;
        }
    })).catch((err) => {
        console.log(err);
    });
    res.json(ress);
}));
patientRouter.post("/saveAccessToken", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jsonRes = new response_1.RespondesModel();
    const { id_patient, accessToken } = req.body;
    yield patients_1.default.findOneAndUpdate({ _id: id_patient }, { fitbitAccessToken: accessToken });
    jsonRes.code = 200;
    jsonRes.message = "token guardado";
    jsonRes.status = true;
    res.json(jsonRes);
}));
exports.default = patientRouter;
//# sourceMappingURL=patient.js.map