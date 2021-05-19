import {
  getMenusByRestaurant,
  getRestaurants,
} from "./services/restaurantService.js";
import _ from "lodash";
import { createOrder } from "./services/orderService.js";
import admin from "firebase-admin";

export function route(app) {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("/restaurants", async (req, res) => {
    let query = req.query;
    if (!_.has(query, "lat") || !_.has(query, "lng")) {
      res.status = 400;
      res.send({
        status: "error",
        error: "invalid request query",
      });
    }
    let { lat, lng } = query;
    let restaurants = await getRestaurants(lat, lng);
    res.send({
      status: "success",
      results: restaurants,
    });
  });

  app.get("/restaurants/:restaurantId/menus", async (req, res) => {
    let { restaurantId } = req.params;
    try {
      let menus = await getMenusByRestaurant(restaurantId);
      res.send({
        status: "success",
        results: menus,
      });
    } catch (e) {
      res.status(404);
      res.send({
        status: "error",
        error: "Not found",
      });
    }
  });
}

export async function authRoute(app) {
  app.post("/orders", async (req, res) => {
    let params = req.body;
    if (!_.has(params, "menus") || !_.has(params, "token")) {
      res.status(400);
      res.send({
        status: "error",
        error: "invalid request params",
      });
      return;
    }
    let { menu, token } = params;
    try {
      let decodedToken = await admin.auth().verifyIdToken(token);
      const uid = decodedToken.uid;
      //TODO : create order
      let order = await createOrder(uid, menu);
      res.send({
        status: "success",
        results: {},
      });
    } catch (e) {
      if (_.has(e, "errorInfo")) {
        res.status(401);
        res.send({
          status: "error",
          error: "token is invalid",
        });
      } else {
        res.status(500);
        res.send({
          status: "error",
          error: "internal server error",
        });
      }
    }
  });
}
