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
const medics_1 = __importDefault(require("../models/medics"));
const patients_1 = __importDefault(require("../models/patients"));
const medicalFile_1 = __importDefault(require("../models/medicalFile"));
const dataProfessional_1 = __importDefault(require("../models/dataProfessional"));
const doctorRouter = (0, express_1.Router)();
doctorRouter.post("/updateProfile", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jsonRes = new response_1.RespondesModel();
    const { fullName, typeDni, dni, email, phone, address, speciality, gender, university, uniAdmissionDate, uniGraduationDate, mpps, postgrade, postgradeUniversity, postgradeGraduationDate, postgradeAdmissionDate, additional, dayService, dayService2, id, id_medic } = req.body;
    const idUser = { id_user: id };
    const _id = { _id: id };
    const idMedic = { id_medic: id_medic };
    const update_user = { email: email };
    const update_medic = {
        fullName: fullName,
        typeDni: typeDni,
        dni: dni,
        phone: phone,
        address: address,
        gender: gender,
        speciality: speciality,
    };
    const update_dataprof = {
        university: university,
        uniAdmissionDate: uniAdmissionDate,
        uniGraduationDate: uniGraduationDate,
        mpps: mpps,
        postgrade: postgrade,
        postgradeUniversity: postgradeUniversity,
        postgradeGraduationDate: postgradeGraduationDate,
        postgradeAdmissionDate: postgradeAdmissionDate,
        additional: additional,
        dayService: dayService,
        dayService2: dayService2
    };
    yield Users_1.default.findOneAndUpdate(_id, update_user);
    yield medics_1.default.findOneAndUpdate(idUser, update_medic);
    yield dataProfessional_1.default.findOneAndUpdate(idMedic, update_dataprof);
    jsonRes.code = 200;
    jsonRes.message = "actualizado";
    jsonRes.status = true;
    res.json(jsonRes);
}));
doctorRouter.post("/getPatientByDni", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let patient = "";
    const jsonRes = new response_1.RespondesModel();
    const { typeDni, dni } = req.body;
    const ress = yield patients_1.default.findOne({ typeDni: typeDni, dni: dni }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (res) {
            jsonRes.code = 200;
            jsonRes.message = "paciente encontrado";
            jsonRes.status = true;
            yield Users_1.default.findOne({ _id: (_a = res.id_user) === null || _a === void 0 ? void 0 : _a.toString() }).then((res2) => __awaiter(void 0, void 0, void 0, function* () {
                if (res2) {
                    let patient = {
                        id: res2._id,
                        id_patient: res._id,
                        fullName: res.fullName,
                        email: res2.email,
                        phone: res.phone,
                        typeDni: res.typeDni,
                        dni: res.dni,
                        address: res.address,
                        ensurancePolicy: res.ensurancePolicy,
                        policyNumber: res.policyNumber,
                        gender: res.gender,
                        birthdate: res.birthdate,
                        // fitbitToken: res.fitbitToken,
                    };
                    jsonRes.data = patient;
                    return jsonRes;
                }
                else {
                    jsonRes.code = 400;
                    jsonRes.message = "Usario no encontrado";
                    jsonRes.status = false;
                }
            })).catch((err) => {
                console.log(err);
            });
        }
        else {
            jsonRes.code = 400;
            jsonRes.message = "paciente no encontrado";
            jsonRes.status = false;
        }
    })).catch((err) => {
        console.log(err);
    });
    res.json(jsonRes);
}));
doctorRouter.post("/getMedicalFile", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jsonRes = new response_1.RespondesModel();
    const { id_patient } = req.body;
    yield medicalFile_1.default.findOne({ id_patient: id_patient }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(res);
        if (res) {
            jsonRes.code = 200;
            jsonRes.message = "historial encontrado";
            jsonRes.status = true;
            jsonRes.data = res;
            return jsonRes;
        }
        else {
            jsonRes.code = 400;
            jsonRes.message = "historial no encontrado";
            jsonRes.status = false;
            return jsonRes;
        }
    }));
    console.log(jsonRes);
    res.json(jsonRes);
}));
exports.default = doctorRouter;
//# sourceMappingURL=doctors.js.map