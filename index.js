import { route, authRoute } from "./routes.js";
import express from "express";
import bodyParser from "body-parser";
import admin from "firebase-admin";

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

admin.initializeApp({ credential: admin.credential.applicationDefault() });

route(app);
authRoute(app);

app.listen(port, () => {
  console.log(`server start at port ${port}`);
});
