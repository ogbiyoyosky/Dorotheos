import bodyParser from "body-parser";
import compression from "compression";
import path from "path";
import express, { Request, Response, NextFunction } from "express";
import ApplicationError from "./errors/application-error";
import routes from "./routes";
import connect from "./mongo-connection";
const cors = require('cors');



const app = express();
connect();

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("port", process.env.PORT || 3000);

app.use(routes);

app.use(function (req, res, next) {
  return res.status(404).send({
    status: "Not Found",
    status_code: 404,
  });
});

app.use(
  (err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(err);
    }

    return res.status(err.status || 500).json({
      error: process.env.NODE_ENV === "development" ? err : undefined,
      message: err.message,
    });
  }
);

export default app;
