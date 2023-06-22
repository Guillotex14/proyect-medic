import { Router, Request, Response } from "express";
import { RespondesModel } from "../models/response";
import Users from "../models/Users";
import patients from "../models/patients";

const patientRouter = Router();

patientRouter.get("/allMedics", async (req: Request, res: Response) => {

    const jsonRes: RespondesModel = new RespondesModel();

    const ress =  await Users.find({type_user: "doctor"}).then((res) => {
        if (res) {
            jsonRes.code = 200;
            jsonRes.message = "lista de medicos";
            jsonRes.status = true;
            jsonRes.data = res;
            return jsonRes;
        } else if (!res) {
            jsonRes.code = 400;
            jsonRes.message = "no hay medicos";
            jsonRes.status = false;
            return jsonRes;
        }
    }).catch((err) => {
        console.log(err)
    });

    res.json(ress);
});


patientRouter.post("/updateProfile", async (req: Request, res: Response) => {

    const jsonRes: RespondesModel = new RespondesModel();

    const {id,fullName,email,phone,typeDni,dni,address,ensurancePolicy,policyNumber,gender,birthdate} = req.body;

    const id_user = {id: id};
    const update_user = {email: email};

    console.log(req.body)

    await Users.findOneAndUpdate(id_user, update_user);

    await patients.findOneAndUpdate(id_user, {
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
});

patientRouter.get("/createDate", async (req: Request, res: Response) => {

    const jsonRes: RespondesModel = new RespondesModel();



});

export default patientRouter;