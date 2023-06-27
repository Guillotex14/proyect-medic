import { Router, Request, Response } from "express";
import  bcrypt  from "bcrypt";
// import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

//modelss
import Users from "../models/Users";
import { RespondesModel } from "../models/response";
import patients from "../models/patients";
import dataProfessional from "../models/dataProfessional";
import medics from "../models/medics";
import medicalFile from "../models/medicalFile";
import codeVerification from "../models/codeVerification";

const authRouter = Router();

authRouter.post("/loginPatient", async (req: Request, res: Response) => {

    const jsonRes: RespondesModel = new RespondesModel();

    const { email, password } = req.body;
    const ress =  await Users.findOne({email: email}).then(async (res) => {
        if (res) {

            const validP = await bcrypt.compare(password, res.password!);

            if (validP) {
                jsonRes.code = 200;
                jsonRes.message = "login success";
                jsonRes.status = true;

                await patients.findOne({id_user: res._id.toString()}).then(async (res2) => {
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
                            ensuracePolicy: res2.ensurancePolicy != "" ? res2.ensurancePolicy : "",
                            policyNumber: res2.policyNumber != "" ? res2.policyNumber : ""
                        }

                        jsonRes.data = patientInfo;
                    }else{
                        jsonRes.code = 400;
                        jsonRes.message = "no existe 1";
                        jsonRes.status = false;
                        jsonRes.data = res;
                        return jsonRes;
                    }   
                    
                }).catch((err) => {
                    console.log(err)
                });

                return jsonRes;
            } else {
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

    const ress =  await Users.findOne({email: email}).then(async (res) => {
        if (res) {

            const validP = await bcrypt.compare(password, res.password!);

            if (validP) {
                jsonRes.code = 200;
                jsonRes.message = "login success";
                jsonRes.status = true;

                await medics.findOne({id_user: res._id}).then((res2) => {
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
                        }

                        jsonRes.data = me;

                    }else{
                        jsonRes.code = 400;
                        jsonRes.message = "no existe";
                        jsonRes.status = false;
                        jsonRes.data = res;
                        return jsonRes;
                    }
                }).catch((err) => {
                    console.log(err)
                });

                return jsonRes;
            } else {
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
    
    const newUser = new Users({email, password: hash, type_user: "doctor"});
    const newMedic = new medics({fullName,typeDNISelected,dni,phone,address,gender,speciality});

    const newDataProfessional = new dataProfessional({university,uniAdmissionDate,uniGraduationDate,mpps,postgrade,postgradeGraduationDate,postgradeUniversity,postgradeAdmissionDate,additional,dayService,dayService2});
    
    await newUser.save().then((res) => {
        newMedic.id_user = newUser._id;
        
    }).catch((err) => {
        console.log(err)
    });
    
    await newMedic.save().then((res) => {
        newDataProfessional.id_medic = newMedic._id;
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

authRouter.post("/registerPatient", async (req: Request, res: Response) => {
    const jsonRes: RespondesModel = new RespondesModel();

    const { fullName,typeDni,dni,email,password,phone,address,gender,diseases,alergies,condition,aditional,birthdate } = req.body;
    
    const saltRounds = 10;

    const hash = await bcrypt.hash(password, saltRounds);

    const newUser = new Users({email, password:hash, type_user: "paciente"});
    const newPatient = new patients({fullName,typeDni,dni,birthdate,phone,address,gender})

    let stringDiseases = "";
    let stringAlergies = "";

    for (let i = 0; i < diseases.length; i++) {
        if (stringDiseases=="") {
            stringDiseases = diseases[i];
        }else{
            stringDiseases = stringDiseases + "," + diseases[i];
        }
    }

    for (let i = 0; i < alergies.length; i++) {
        if (stringAlergies=="") {
            stringAlergies = alergies[i];
        }else{
            stringAlergies = stringAlergies + "," + alergies[i];
        }
    }

    const filePatient = new medicalFile({disease:stringDiseases,allergy:stringAlergies,condiction:condition,additional:aditional});

    await newUser.save().then((res) => {
        newPatient.id_user = newUser._id;
    }).catch((err) => {
        console.log(err)
    });

    await newPatient.save().then((res) => {
        filePatient.id_patient = newPatient._id;
    }).catch((err) => {
        console.log(err)
    });

    await filePatient.save();

    jsonRes.code = 200;
    jsonRes.message = "register success";
    jsonRes.status = true;
    jsonRes.data = {};

    res.json(jsonRes);
});

authRouter.post("/forgotPassword", async (req: Request, res: Response) => {
    
    const jsonResp:RespondesModel = new RespondesModel();

    const { email } = req.body;

    const ress = await Users.findOne({email: email}).then(async (res) => {
        if (res) {
            jsonResp.code = 200;
            jsonResp.message = "email exist";
            jsonResp.status = true;

            const code = Math.floor(Math.random() * (9999 - 1000)) + 1000;

            const newCode = new codeVerification({code: code, email:email});
            
            await newCode.save().then((res2) => {

                const transporter = nodemailer.createTransport({
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

                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        // console.log('Email sent: ' + info.response);
                    };
                });

            }).catch((err) => {
                console.log(err)
            });

            jsonResp.data = {};

            return jsonResp;

        } else if (!res) {
            jsonResp.code = 400;
            jsonResp.message = "email not exist";
            jsonResp.status = false;
            return jsonResp;
        }
    }).catch((err) => {
        console.log(err)
    });

    console.log(ress)

    res.json(ress);

});

authRouter.post("/verifyCode", async (req: Request, res: Response) => {
    const jsonResp = new RespondesModel();

    const { code, email } = req.body;

    const ress = await codeVerification.findOne({code: code, email: email}).then(async (res) => {
        if (res) {
            jsonResp.code = 200;
            jsonResp.message = "codigo verificado exitosamente";
            jsonResp.status = true;

            await codeVerification.deleteOne({code: code, email: email}).then((res) => {
            }).catch((err) => {
                console.log(err)
            });

            return jsonResp;
        } else if (!res) {
            jsonResp.code = 400;
            jsonResp.message = "codigo no valido";
            jsonResp.status = false;
            return jsonResp;
        }
    }
    ).catch((err) => {
        console.log(err)
    });
    
    res.json(ress);
    
});

authRouter.post("/resetPassword", async (req: Request, res: Response) => {
    const jsonResp: RespondesModel = new RespondesModel();

    console.log(req.body)

    const { email, password } = req.body;

    const saltRounds = 10;

    const hash = await bcrypt.hash(password, saltRounds);

    console.log(hash);
    
    const filter = { email: email };

    const update = { password: hash };

    const ress = await Users.findOneAndUpdate(filter,update).then((res) => {
        console.log(res);
        if (res) {
            jsonResp.code = 200;
            jsonResp.message = "password reset";
            jsonResp.status = true;
            jsonResp.data = {};
        } else if (!res) {
            jsonResp.code = 400;
            jsonResp.message = "password not reset";
            jsonResp.status = false;
            jsonResp.data = {};
        }

        return jsonResp;
    }).catch((err) => {
        console.log(err)
    });

    res.json(ress);
});

authRouter.post("/emailExist", async (req: Request, res: Response) => {
    const jsonResp: RespondesModel = new RespondesModel();

    const { email } = req.body;

    const ress = await Users.findOne({email: email}).then((res) => {
        console.log(res);
        if (res) {
            jsonResp.code = 200;
            jsonResp.message = "email exist";
            jsonResp.status = true;
            jsonResp.data = {};

            return jsonResp;
        } else if (!res) {
            jsonResp.code = 400;
            jsonResp.message = "email not exist";
            jsonResp.status = false;
            jsonResp.data = {};

            return jsonResp;
        }
    }).catch((err) => {
        console.log(err)
    });
    
    res.json(ress);

});

export default authRouter;