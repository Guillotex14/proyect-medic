import  Express  from "express";
import { port } from "./config";
import authRouter from "./src/routes/auth";
import path from "path"

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
        this.app.use(Express.urlencoded({ extended: false }));
    }

    routes() {
        this.app.use("/auth", authRouter );

        this.app.use(Express.static(path.join(__dirname, "public")));
    }

    start(): void {
        this.app.listen(port, () => {
            console.log("Server listening on port", port);
        });
    }
}
