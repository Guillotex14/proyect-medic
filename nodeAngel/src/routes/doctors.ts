import { Router, Request, Response } from "express";

import mongoose from 'mongoose';

import { RespondesModel } from "../models/response";
import users from "../models/Users";
import medics from "../models/medics";
import patients from "../models/patients";
import medicalFiles from "../models/medicalFile";
import dataProfessional from "../models/dataProfessional";
import dates from "../models/dates";

const doctorRouter = Router();

doctorRouter.post("/updateProfile", async (req: Request, res: Response) => {

    const jsonRes: RespondesModel = new RespondesModel();

    const { fullName,typeDni,dni,email,phone,address,speciality,gender,university,uniAdmissionDate,uniGraduationDate,mpps,postgrade,postgradeUniversity,postgradeGraduationDate,postgradeAdmissionDate,additional,dayService,dayService2,id,id_medic } = req.body;

    const idUser = {id_user: id};
    const _id = {_id:id};
    const idMedic = {id_medic: id_medic};
    
    const update_user = {email: email};

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
    }

    await users.findOneAndUpdate(_id, update_user);

    await medics.findOneAndUpdate(idUser, update_medic);

    await dataProfessional.findOneAndUpdate(idMedic, update_dataprof);

    jsonRes.code = 200;
    jsonRes.message = "actualizado";
    jsonRes.status = true;
    
    res.json(jsonRes);

});

doctorRouter.post("/getPatientByDni", async (req: Request, res: Response) => {

    // let patient = "";

    const jsonRes: RespondesModel = new RespondesModel();

    const { typeDni,dni } = req.body;

    const ress = await patients.findOne({typeDni: typeDni, dni: dni}).then(async (res) => {
        if (res) {
            jsonRes.code = 200;
            jsonRes.message = "paciente encontrado";
            jsonRes.status = true;

            await users.findOne({_id: res.id_user?.toString()}).then(async (res2) => {
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
                    }

                    jsonRes.data = patient;
                    return jsonRes;

                }else{  
                    jsonRes.code = 400;
                    jsonRes.message = "Usario no encontrado";
                    jsonRes.status = false;
                }
            }).catch((err) => {
                console.log(err)
            });

        }else{
            jsonRes.code = 400;
            jsonRes.message = "paciente no encontrado";
            jsonRes.status = false;
        }
    }).catch((err) => {
        console.log(err)
    });

    res.json(jsonRes);
});

doctorRouter.post("/getMedicalFile", async (req: Request, res: Response) => {

    const jsonRes: RespondesModel = new RespondesModel();

    const { id_patient } = req.body;

    await medicalFiles.findOne({id_patient: id_patient}).then(async (res) => {

        console.log(res);

        if (res) {
            jsonRes.code = 200;
            jsonRes.message = "historial encontrado";
            jsonRes.status = true;

            jsonRes.data = res;

            return jsonRes;

        }else{
            jsonRes.code = 400;
            jsonRes.message = "historial no encontrado";
            jsonRes.status = false;
            
            return jsonRes;
        }
    });

    console.log(jsonRes);

    res.json(jsonRes);

});

doctorRouter.get("/getMyDates", async (req: Request, res: Response) => {
    
        const jsonRes: RespondesModel = new RespondesModel();
    
        const myDates = await dates.find({id_medic: req.query.id_medic});

        if (myDates) {
            jsonRes.code = 200;
            jsonRes.message = "citas encontradas";
            jsonRes.status = true;
            jsonRes.data = myDates;
        }else{
            jsonRes.code = 400;
            jsonRes.message = "citas no encontradas";
            jsonRes.status = false;
        }

        res.json(jsonRes);
    
});

doctorRouter.get("/lastDate", async (req: Request, res: Response) => {

    const jsonRes: RespondesModel = new RespondesModel();

    const {id_medic} = req.query;

    const query = {
        id_medic: new mongoose.Types.ObjectId(`${id_medic}`),
        status: 2
    }

    const lastDate = await dates.aggregate([
        {
            $match: query
        },
        {
            $lookup: {
                from: "patients",
                localField: "id_patient",
                foreignField: "_id",
                as: "patient"
            }
        }
    ]).sort({date: -1}).limit(1);

    // const lastDate = await dates.find({id_medic: id_medic, status: 1}).sort({date: -1}).limit(1);
// console.log(lastDate.length > 0)
    if (lastDate.length > 0) {
        jsonRes.code = 200;
        jsonRes.message = "cita encontrada";
        jsonRes.status = true;
        jsonRes.data = lastDate[0];
    }else{
        jsonRes.code = 400;
        jsonRes.message = "cita no encontrada";
        jsonRes.status = false;
        jsonRes.data = [];
    }

    res.json(jsonRes);
}); 

doctorRouter.get("/myDates", async (req: Request, res: Response) => {
    const jsonRes: RespondesModel = new RespondesModel();

    const {id_medic} = req.query;

    let query = {
        id_medic: new mongoose.Types.ObjectId(`${id_medic}`)
    }

    const myDates = await dates.aggregate([
        {
            $match: query
        },
        {
            $lookup: {
                from: "patients",
                localField: "id_patient",
                foreignField: "_id",
                as: "patient"
            }
        },
    ]).sort({date: -1});

    if (myDates) {
        jsonRes.code = 200;
        jsonRes.message = "citas encontradas";
        jsonRes.status = true;
        jsonRes.data = myDates;
    }else{
        jsonRes.code = 400;
        jsonRes.message = "citas no encontradas";
        jsonRes.status = false;
    }

    res.json(jsonRes);
});


export default doctorRouter;