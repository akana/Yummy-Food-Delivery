import {
  getMenusByRestaurant,
  getRestaurants,
} from "./services/restaurantService.js";
import _ from "lodash";

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

export function authRoute(app) {
  app.post("/orders", (req, res) => {
    res.send("create order");
  });
}
