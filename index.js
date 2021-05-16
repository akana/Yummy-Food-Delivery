import { route, authRoute } from "./routes.js";
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

route(app);
authRoute(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
