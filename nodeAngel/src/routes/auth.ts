import { Router, Request, Response } from "express";

//modelss
import Users from "../models/Users";

const authRouter = Router();

authRouter.get("/loginPatient", async (req: Request, res: Response) => {
    console.log(req.body);
    const { email, password } = req.body;
    const ress =  await Users.findOne({email: email}).then((res) => {
        
        if (res) {
            if (res.password == password) {
                
                return "login exitoso";
            } else if (res.password != password && res.password != null) {
                return "password incorrecto";
            }
            return res;
        } else if (!res) {
            return "no existe";
        }
    }).catch((err) => {
        console.log(err)
    });

    console.log(ress)
    res.send("loginPatient");
});

authRouter.get("/loginMedic", (req: Request, res: Response) => {
    console.log("loginMedic")
    res.send("loginMedic");
});

authRouter.get("/register", (req: Request, res: Response) => {
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