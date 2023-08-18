import { Router, Request, Response, json } from "express";
import mongoose from "mongoose";

import { RespondesModel } from "../models/response";
import Users from "../models/Users";
import patients from "../models/patients";
import dates from "../models/dates";
import medics from "../models/medics";
import dataProfessional from "../models/dataProfessional";

const patientRouter = Router();

patientRouter.get("/allMedics", async (req: Request, res: Response) => {

    const jsonRes: RespondesModel = new RespondesModel();
    // let araryMedics: any[] = [];
    // let arrayInfoMedics: any[] = [];
    // let dataProf: any[] = [];

    // const ress =  await Users.find({type_user: "doctor"}).then(async (res) => {
    //     if (res) {
            
    //         for (let i = 0; i < res.length; i++) {
    //             await medics.find({id_user: res[i]._id}).then((res2) => {
    //                 if (res2) {
    //                     res2.forEach((element: any) => {
    //                         arrayInfoMedics.push(element);
    //                     });
    //                 }
    //             }).catch((err) => {
    //                 console.log(err)
    //             });
                
    //         }

    //         for (let i = 0; i < arrayInfoMedics.length; i++) {
    //             await dataProfessional.find({id_medic: arrayInfoMedics[i]._id}).then((res3) => {
    //                 if (res3) {
    //                     res3.forEach((element: any) => {
    //                         dataProf.push(element);
    //                     });
    //                 }
    //             }).catch((err) => {
    //                 console.log(err)
    //             });
    //         }

    //         for (let j = 0; j < arrayInfoMedics.length; j++) {
    //             for (let k = 0; k < dataProf.length; k++) {
    //                 if (arrayInfoMedics[j]._id.toString() == dataProf[k].id_medic.toString()){
    //                     let infoMedic = {
    //                         id_medic: arrayInfoMedics[j]._id,
    //                         id_user: arrayInfoMedics[j].id_user,
    //                         fullName: arrayInfoMedics[j].fullName,
    //                         typeDni: arrayInfoMedics[j].typeDni,
    //                         dni: arrayInfoMedics[j].dni,
    //                         birthdate: arrayInfoMedics[j].birthdate,
    //                         address: arrayInfoMedics[j].address,
    //                         city: arrayInfoMedics[j].city,
    //                         phone: arrayInfoMedics[j].phone,
    //                         speciality: arrayInfoMedics[j].speciality,
    //                         university: dataProf[k].university,
    //                         uniAdmissionDate: dataProf[k].uniAdmissionDate,
    //                         uniGraduationDate: dataProf[k].uniGraduationDate,
    //                         postgrade: dataProf[k].postgrade,
    //                         postgradeUniversity: dataProf[k].postgradeUniversity,
    //                         postgradeAdmissionDate: dataProf[k].postgradeAdmissionDate,
    //                         postgradeGraduationDate: dataProf[k].postgradeGraduationDate,
    //                         dayService: dataProf[k].dayService,
    //                         dayService2: dataProf[k].dayService2,
    //                         additional: dataProf[k].additional,
    //                     }
    //                     araryMedics.push(infoMedic);
    //                 }
    //             }
    //         }

    //         jsonRes.code = 200;
    //         jsonRes.message = "medicos";
    //         jsonRes.status = true;
    //         jsonRes.data = araryMedics;
    //         return jsonRes;

    //     } else if (!res) {
    //         jsonRes.code = 400;
    //         jsonRes.message = "no hay medicos";
    //         jsonRes.status = false;
    //         return jsonRes;
    //     }
    // }).catch((err) => {
    //     console.log(err)
    // });

    const { city, speciality } = req.query

    const query = {
        city: { $regex: city, $options: 'i' },
        speciality: { $regex: speciality, $options: 'i'}
    }

    const myMedics = await medics.aggregate([
        {
            $match: query
        },
        {
            $lookup: {
                from: "users",
                localField: "id_user",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $lookup: {
                from: "dataprofessionals",
                localField: "_id",
                foreignField: "id_medic",
                as: "dataProfessional"
            }
        }

    ]);

    if (myMedics) {
        jsonRes.code = 200;
        jsonRes.message = "medicos encontrados";
        jsonRes.status = true;
        jsonRes.data = myMedics;
    }else{

        jsonRes.code = 400;
        jsonRes.message = "medicos no encontrados";
        jsonRes.status = false;

    }

    res.json(jsonRes);
});

patientRouter.post("/updateProfile", async (req: Request, res: Response) => {

    const jsonRes: RespondesModel = new RespondesModel();

    const {id,fullName,email,phone,typeDni,dni,address,ensurancePolicy,policyNumber,gender,birthdate} = req.body;

    const id_user = {id_user: id};
    const _id = {_id: id};
    const update_user = {email: email};
    let id_patient = "";

    console.log(req.body)

    await Users.findOneAndUpdate(_id, update_user);

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
    }).then((res) => {
        console.log(res);
        if (res) {
            id_patient = res._id.toString();
        }
    }).catch((err) => {
        console.log(err)
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
});

patientRouter.post("/createDate", async (req: Request, res: Response) => {

    const jsonRes: RespondesModel = new RespondesModel();

    const {id_patient,id_medic,reason,symptoms,date} = req.body;

    let symptomsString = "";

    symptoms.forEach((element: any) => {

        if (symptomsString.length == 0) {
            symptomsString = element;
        }else{
            symptomsString = symptomsString + element + ", ";
        }

    });


    const newDate = new dates({
        id_patient: id_patient,
        id_medic: id_medic,
        date: date,
        reason: reason,
        symptoms: symptomsString,
        status: 2
    });

    await newDate.save();

    jsonRes.code = 200;
    jsonRes.message = "cita creada";
    jsonRes.status = true;

    res.json(jsonRes);

});

patientRouter.post("/verifyAccessToken", async (req: Request, res: Response) => {
    const jsonRes: RespondesModel = new RespondesModel();
    const {id_patient} = req.body;

    const ress = await patients.findOne({_id: id_patient}).then(async (res) => {
        if (res) {
            jsonRes.code = 200;
            jsonRes.message = "paciente";
            jsonRes.status = true;
            jsonRes.data = res;
            return jsonRes;
        }else{
            jsonRes.code = 400;
            jsonRes.message = "no hay token";
            jsonRes.status = false;
            return jsonRes;
        }
    
    }).catch((err) => {
        console.log(err)
    });

    res.json(ress);
});

patientRouter.post("/saveAccessToken", async (req: Request, res: Response) => {
    const jsonRes: RespondesModel = new RespondesModel();

    const {id_patient,accessToken} = req.body;

    await patients.findOneAndUpdate({_id: id_patient}, {fitbitAccessToken: accessToken})

    jsonRes.code = 200;
    jsonRes.message = "token guardado";
    jsonRes.status = true;

    res.json(jsonRes);

});

patientRouter.get("/getDates", async (req: Request, res: Response) => {

    const jsonRes: RespondesModel = new RespondesModel();

    const {id_patient} = req.query; 

    const query = {
        id_patient: new mongoose.Types.ObjectId(`${id_patient}`),
    }

    const myDates = await dates.aggregate([
        {
            $match: query
        },
        {
            $lookup: {
                from: "medics",
                localField: "id_medic",
                foreignField: "_id",
                as: "medic"
            }
        }
    ]);

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

patientRouter.get("/lastDate", async (req: Request, res: Response) => {
    
        const jsonRes: RespondesModel = new RespondesModel();
    
        const {id_patient} = req.query; 
    
        const query = {
            id_patient: new mongoose.Types.ObjectId(`${id_patient}`),
        }
    
        const myDates = await dates.aggregate([
            {
                $match: query
            },
            {
                $lookup: {
                    from: "medics",
                    localField: "id_medic",
                    foreignField: "_id",
                    as: "medic"
                }
            }
        ]);
    
        if (myDates) {
            jsonRes.code = 200;
            jsonRes.message = "citas encontradas";
            jsonRes.status = true;
            jsonRes.data = myDates[myDates.length - 1];
        }else{
            jsonRes.code = 400;
            jsonRes.message = "citas no encontradas";
            jsonRes.status = false;
        }
    
        res.json(jsonRes);
    
});

export default patientRouter;