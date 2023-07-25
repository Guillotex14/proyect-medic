import  Express  from "express";
import { port } from "./config";
import cors from "cors";
import authRouter from "./src/routes/auth";
import patientRouter from "./src/routes/patient";
import doctorRouter from "./src/routes/doctors"
import path from "path"
// import authFitbit from "./src/routes/fitbitAuth";

export class App {
    app: Express.Application;

    constructor() {
        this.app = Express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set("views", path.join(__dirname, "views"));
    }

    middlewares() {
        this.app.use(Express.json());
        this.app.use(cors())
        this.app.use(Express.urlencoded({ extended: false }));
    }

    routes() {
        this.app.use("/auth", authRouter );
        this.app.use("/patient", patientRouter);
        this.app.use("/doctor", doctorRouter);
        // this.app.use("/fitbit", authFitbit)
        this.app.use(Express.static(path.join(__dirname, "src")));
        this.app.use(Express.static(path.join(__dirname, "dist")));
    }

    start(): void {
        this.app.listen(port, () => {
            console.log("Server listening on port", port);
        });
    }
}
