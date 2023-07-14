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
const CLIENT_ID = '23R7C6'; // Reemplazar con tu Client ID de Fitbit
const REDIRECT_URI = 'http://localhost'; // Reemplazar con tu Redirect URI de Fitbit
const STATE = 'YOUR_STATE'; // Reemplazar con un valor aleatorio o único para protección CSRF
const SCOPES = 'activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight'; // No modificar
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
                            city: res2.city,
                            id_patient: res2._id,
                            ensuracePolicy: res2.ensurancePolicy != "" ? res2.ensurancePolicy : "",
                            policyNumber: res2.policyNumber != "" ? res2.policyNumber : "",
                            gender: res2.gender
                        }

                        jsonRes.data = patientInfo;
                        return jsonRes;
                    }else{
                        jsonRes.code = 400;
                        jsonRes.message = "no existe 1";
                        jsonRes.status = false;
                        // jsonRes.data = res;
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
                await medics.findOne({id_user: res._id}).then(async (res2) => {
                    if (res2) {
                        await dataProfessional.findOne({id_medic: res2._id}).then(async (res3) => {
                            if (res3){
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
                                    city: res2.city,
                                    id_medic: res2._id,
                                    speciality: res2.speciality,
                                    gender: res2.gender,
                                    university: res3.university,
                                    uniAdmissionDate: res3.uniAdmissionDate,
                                    uniGraduationDate: res3.uniGraduationDate,
                                    mpps: res3.mpps,
                                    postgrade: res3.postgrade,
                                    postgradeAdmissionDate: res3.postgradeAdmissionDate,
                                    postgradeGraduationDate: res3.postgradeGraduationDate,
                                    postgradeUniversity: res3.postgradeUniversity,
                                    dayService: res3.dayService,
                                    dayService2: res3.dayService2,
                                    additional: res3.additional
                                }
                                jsonRes.data = me;
                            }else{
                                jsonRes.code = 400;
                                jsonRes.message = "no existe 3";
                                jsonRes.status = false;
                                jsonRes.data = res;
                                return jsonRes;
                            }
                        });
                    }else{
                        jsonRes.code = 400;
                        jsonRes.message = "no existe 2";
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
    res.json(jsonRes);
});

authRouter.post("/registerMedic", async (req: Request, res: Response) => {
    const jsonRes: RespondesModel = new RespondesModel();

    const { fullName,typeDNISelected,dni,email,password,phone,address,speciality,gender,university,uniAdmissionDate,uniGraduationDate,mpps,postgrade,postgradeUniversity,postgradeGraduationDate,postgradeAdmissionDate,additional,dayService,dayService2,city } = req.body;

    const saltRounds = 10;

    const hash = await bcrypt.hash(password, saltRounds);
    
    const newUser = new Users({email, password: hash, type_user: "doctor"});
    const newMedic = new medics({fullName,typeDNISelected,dni,phone,address,city,gender,speciality});

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

    let userMedic = {
        id: newUser._id,
        id_medic: newMedic._id,
        email: newUser.email,
        typeUser: newUser.type_user,
        fullName: newMedic.fullName,
        typeDni: newMedic.typeDni,
        dni: newMedic.dni,
        birthdate: newMedic.birthdate,
        phone: newMedic.phone,
        address: newMedic.address,
        speciality: newMedic.speciality,
        university: newDataProfessional.university,
        uniAdmissionDate: newDataProfessional.uniAdmissionDate,
        uniGraduationDate: newDataProfessional.uniGraduationDate,
        mpps: newDataProfessional.mpps,
        postgrade: newDataProfessional.postgrade,
        postgradeUniversity: newDataProfessional.postgradeUniversity,
        postgradeGraduationDate: newDataProfessional.postgradeGraduationDate,
        postgradeAdmissionDate: newDataProfessional.postgradeAdmissionDate,
        additional: newDataProfessional.additional,
        dayService: newDataProfessional.dayService,
        dayService2: newDataProfessional.dayService2,
    }

    jsonRes.code = 200;
    jsonRes.message = "register success";
    jsonRes.status = true;
    jsonRes.data = userMedic;


    res.json(jsonRes);
});

authRouter.post("/registerPatient", async (req: Request, res: Response) => {
    const jsonRes: RespondesModel = new RespondesModel();

    const { fullName,typeDni,dni,email,password,phone,address,gender,diseases,alergies,condition,aditional,birthdate,city } = req.body;
    
    const saltRounds = 10;

    const hash = await bcrypt.hash(password, saltRounds);

    const newUser = new Users({email, password:hash, type_user: "paciente"});
    const newPatient = new patients({fullName,typeDni,dni,birthdate,phone,address,gender,city})

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

    let userPatient = {
        id: newUser._id,
        id_patient: newPatient._id,
        fullName: newPatient.fullName,
        typeDni: newPatient.typeDni,
        dni: newPatient.dni,
        email: newUser.email,
        password: newUser.password,
        phone: newPatient.phone,
        address: newPatient.address,
        gender: newPatient.gender,
        diseases: diseases,
        alergies: alergies,
        condition: filePatient.condiction,
        aditional: filePatient.additional,
        birthdate: newPatient.birthdate,
    }

    jsonRes.code = 200;
    jsonRes.message = "register success";
    jsonRes.status = true;
    jsonRes.data = userPatient;

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


// Ruta para mostrar el botón de autorización
authRouter.get('/fitbitAuth', (req, res) => {
  const authUrl = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${SCOPES}`;
  const html = `<html><body><a href="${authUrl}"><button>Iniciar sesión con Fitbit</button></a></body></html>`;
  res.send(html);
});

authRouter.get('/fitbitCallback', async (req, res) => {
    const accessToken = '3e1d22b2013e08a4f57de703077f197934421076'; // Reemplazar con tu access token obtenido

    const profileUrl = 'https://api.fitbit.com/1/user/-/profile.json';

    const requestOptions = {
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
    };

    fetch(profileUrl, requestOptions)
    .then(response => response.json())
    .then(data => {
        // Hacer algo con los datos del perfil del usuario
        console.log(data);
    })
    .catch(error => {
        // Manejar el error de la solicitud
        console.error(error);
    });

});



export default authRouter;