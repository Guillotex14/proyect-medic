"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
// import exphbs from "express-handlebars";
const routes_1 = __importDefault(require("./routes/routes"));
const config_1 = require("./config");
class Application {
    constructor() {
        this.app = (0, express_1.default)();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        // this.app.set("port", 3000);
    }
    middlewares() {
        this.app.use((0, morgan_1.default)("dev"));
    }
    routes() {
        this.app.use("/", routes_1.default);
    }
    start() {
        this.app.listen(config_1.PORT, () => {
            console.log("Server running on port", this.app.get('port'), "...");
        });
    }
}
exports.Application = Application;
// export class Application;
