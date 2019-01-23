// ------------------------------------------------------------
// import dependencies
// ------------------------------------------------------------
import dotenv from "dotenv";
import next from "next";
import express from "express";
// ------------------------------------------------------------
// configure environment variables
// ------------------------------------------------------------
dotenv.config();
// ------------------------------------------------------------
// get next server & options
// ------------------------------------------------------------
const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT;
const rootUrl = process.env.ROOT_URL;
const app = next({ dev });
const handler = app.getRequestHandler();
// ------------------------------------------------------------
// prepare next app
// ------------------------------------------------------------
app.prepare()
    .then(() => {
        // ------------------------------------------------------------
        // create express server
        // ------------------------------------------------------------
        const server = express();
        server.use(express.json()); // middleware to use JSON

        // ------------------------------------------------------------
        // all catch route - place after custom routes
        // ------------------------------------------------------------
        server.get("*", (req, res) => handler(req, res));
        // ------------------------------------------------------------
        // setup server to listen on port
        // ------------------------------------------------------------
        server.listen(port, err => {
            if (err) throw err;
            console.log(`> Ready on ${rootUrl}`);
        });
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    });
