import { Router, Request, Response } from "express";
import  bcrypt  from "bcrypt";
import jwt from "jsonwebtoken";
//modelss
import Users from "../models/Users";
import { RespondesModel } from "../models/response";
import patients from "../models/patients";
import dataProfessional from "../models/dataProfessional";
import medics from "../models/medics";

const authRouter = Router();

authRouter.post("/loginPatient", async (req: Request, res: Response) => {

    const jsonRes: RespondesModel = new RespondesModel();

    const { email, password } = req.body;
    const ress =  await Users.findOne({email: email}).then((res) => {
        
        if (res) {
            if (res.password == password) {
                jsonRes.code = 200;
                jsonRes.message = "login success";
                jsonRes.status = true;
                jsonRes.data = res;
                return jsonRes;
            } else if (res.password != password && res.password != null) {
                jsonRes.code = 400;
                jsonRes.message = "password incorrecto";
                jsonRes.status = false;
                return jsonRes;
            }
        } else if (!res) {
            jsonRes.code = 400;
            jsonRes.message = "no existe";
            jsonRes.status = false;
            return jsonRes;
        }
    }).catch((err) => {
        console.log(err)
    });

    res.json(ress);
});

authRouter.post("/loginMedic", async (req: Request, res: Response) => {
    const jsonRes: RespondesModel = new RespondesModel();

    const { email, password } = req.body;
    const ress =  await Users.findOne({email: email}).then((res) => {
        if (res) {
            if (res.password == password) {
                jsonRes.code = 200;
                jsonRes.message = "login success";
                jsonRes.status = true;
                jsonRes.data = res;
                return jsonRes;
            } else if (res.password != password && res.password != null) {
                jsonRes.code = 400;
                jsonRes.message = "password incorrecto";
                jsonRes.status = false;
                return jsonRes;
            }
        } else if (!res) {
            jsonRes.code = 400;
            jsonRes.message = "no existe";
            jsonRes.status = false;
            return jsonRes;
        }
    }).catch((err) => {
        console.log(err)
    });
    console.log(ress)
    res.json(ress);
});

authRouter.post("/registerMedic", async (req: Request, res: Response) => {
    const jsonRes: RespondesModel = new RespondesModel();

    const { fullName,typeDNISelected,dni,email,password,phone,address,speciality,gender,university,uniAdmissionDate,uniGraduationDate,mpps,postgrade,postgradeUniversity,postgradeGraduationDate,postgradeAdmissionDate,additional,dayService,dayService2 } = req.body;

    const saltRounds = 10;

    const hash = await bcrypt.hash(password, saltRounds);

    console.log(hash)
    
    const newUser = new Users({email, password: hash, type_user: "paciente"});
    const newMedic = new medics({fullName,typeDNISelected,dni,phone,address,gender,speciality});

    const newDataProfessional = new dataProfessional({university,uniAdmissionDate,uniGraduationDate,mpps,postgrade,postgradeGraduationDate,postgradeUniversity,postgradeAdmissionDate,additional,dayService,dayService2});
    
    await newUser.save().then((res) => {
        newMedic.id_user = JSON.stringify(newUser._id);
        
    }).catch((err) => {
        console.log(err)
    });
    
    await newMedic.save().then((res) => {
        newDataProfessional.id_medic = JSON.stringify(newMedic._id);
    }).catch((err) => {
        console.log(err)
    });
    

    await newDataProfessional.save();

    jsonRes.code = 200;
    jsonRes.message = "register success";
    jsonRes.status = true;
    jsonRes.data = newUser;


    res.json(jsonRes);
});

// authRouter.get("/registerMedic", (req: Request, res: Response) => {
//     console.log("Register")
//     res.send("Register");
// });


authRouter.get("/forgotPassword", (req: Request, res: Response) => {
    console.log("forgotPassword")
    res.send("forgotPassword");
});

authRouter.get("/verifyCode", (req: Request, res: Response) => {
    console.log("verifyCode")
    res.send("verifyCode");
});

authRouter.get("/resetPassword", (req: Request, res: Response) => {
    console.log("resetPassword")
    res.send("resetPassword");
});



export default authRouter;