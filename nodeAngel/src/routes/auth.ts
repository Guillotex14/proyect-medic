import { Router, Request, Response } from "express";

//modelss
import Users from "../models/Users";

const authRouter = Router();

authRouter.post("/loginPatient", async (req: Request, res: Response) => {

    const jsonRes = {
        code: 0,
        data: {},
        message: "",
        status: false,
    };

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
    const jsonRes = {
        code: 0,
        data: {},
        message: "",
        status: false,
    };
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

authRouter.get("/registerPatient", (req: Request, res: Response) => {
    console.log("Register")
    res.send("Register");
});

authRouter.get("/registerMedic", (req: Request, res: Response) => {
    console.log("Register")
    res.send("Register");
});


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