import express from "express";
import morgan from "morgan";
// import exphbs from "express-handlebars";
import routes from "./routes/routes";
import { PORT } from "./config";

export class Application {
    app: express.Application;
    
    constructor() {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        // this.app.set("port", 3000);
    }

    middlewares() {
        this.app.use(morgan("dev"));
    }

    routes() {
        this.app.use("/",routes);
    }

    start():void {
        this.app.listen(PORT, () => {
            console.log("Server running on port", this.app.get('port'), "...");
        });
    }
}

// export class Application;

