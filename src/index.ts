//server modules
import express from "express";
import * as http from "http";
import cors from "cors";

//debugging modules
import * as winston from "winston";
import * as expressWinston from "express-winston";
import debug from "debug";

//routers
import { CommonRoutesConfig } from "./common/common.routes.config";
import { RidersRoutes } from "./riders/riders.routes.config";
import { RidesRoutes } from "./rides/rides.routes.config";

//database modules
import { createConnection } from "typeorm";
import dbConfig from "./config/database";

//initializing
const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug("app");

// here we are adding middleware to parse all incoming requests as JSON
app.use(express.json());

// here we are adding middleware to allow cross-origin requests
app.use(cors());

// here we are preparing the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

// here we are crashing on unhandled errors and spitting out a stack trace,
// but only when in debug mode
if (process.env.DEBUG) {
  process.on("unhandledRejection", function (reason) {
    debugLog("Unhandled Rejection:", reason);
    process.exit(1);
  });
} else {
  loggerOptions.meta = false; // when not debugging, make terse
}

// initialize the logger with the above configuration
app.use(expressWinston.logger(loggerOptions));

// here we are adding the UserRoutes to our array,
// after sending the Express.js application object to have the routes added to our app!
routes.push(new RidersRoutes(app), new RidesRoutes(app));

// this is a simple route to make sure everything is working properly
app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(`Express: Server up and running!`);
});

createConnection(dbConfig)
  .then((_connection) => {
    server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
      routes.forEach((route: CommonRoutesConfig) => {
        console.log(`Routes configured for ${route.getName()}`);
      });
    });
  })
  .catch((err) => {
    console.log("Unable to connect to db", err);
    process.exit(1);
  });
