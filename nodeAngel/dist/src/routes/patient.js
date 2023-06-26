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
const patientRouter = (0, express_1.Router)();
patientRouter.get("/allMedics", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jsonRes = new response_1.RespondesModel();
    const ress = yield Users_1.default.find({ type_user: "doctor" }).then((res) => {
        if (res) {
            jsonRes.code = 200;
            jsonRes.message = "lista de medicos";
            jsonRes.status = true;
            jsonRes.data = res;
            return jsonRes;
        }
        else if (!res) {
            jsonRes.code = 400;
            jsonRes.message = "no hay medicos";
            jsonRes.status = false;
            return jsonRes;
        }
    }).catch((err) => {
        console.log(err);
    });
    res.json(ress);
}));
patientRouter.post("/updateProfile", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jsonRes = new response_1.RespondesModel();
    const { id, fullName, email, phone, typeDni, dni, address, ensurancePolicy, policyNumber, gender, birthdate } = req.body;
    const id_user = { id: id };
    const update_user = { email: email };
    console.log(req.body);
    yield Users_1.default.findOneAndUpdate(id_user, update_user);
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
    });
    jsonRes.code = 200;
    jsonRes.message = "actualizado";
    jsonRes.status = true;
    res.json(jsonRes);
}));
patientRouter.get("/createDate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jsonRes = new response_1.RespondesModel();
}));
exports.default = patientRouter;
//# sourceMappingURL=patient.js.map