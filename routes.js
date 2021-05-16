import {
  getMenusByRestaurant,
  getRestaurants,
} from "./services/restaurantService.js";

export function route(app) {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("/restaurants", async (req, res) => {
    let restaurants = await getRestaurants();
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
