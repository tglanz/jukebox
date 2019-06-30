import * as express from 'express';
import * as minimist from 'minimist';

const app = express();

async function entry() {
    const args = minimist(process.argv.slice(2));
    const port = args.port || 3000
    
    const server = app.listen(port);

    await new Promise((resolve, reject) => {
        server.on("listening", () => {
            console.log(`listening`, server.address());
        });

        server.on("connection", () => {
            console.log("connection");
        });

        server.on("error", reject);
        server.on("close", resolve);
    });
}

entry()
    .then(() => console.log("Entry has finished successfully"))
    .catch(error => console.error("Entry error", error));