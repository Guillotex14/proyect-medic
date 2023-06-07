import { mongoConnection } from './database';
import { Application } from './app';

async function main() {
    await mongoConnection();
    const app = new Application();
    app.start();
}

main();

// database();
// const app = new Application();
// // const app = new App();
// app.start();