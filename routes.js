export function route(app) {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  app.get("/restaurants", (req, res) => {
    res.send("restaurants");
  });
  app.get("/restaurants/:restaurantId/menus", (req, res) => {
    let { restaurantId } = req.params;
    res.send("menus: " + restaurantId);
  });
}

export function authRoute(app) {
  app.post("/orders", (req, res) => {
    res.send("create order");
  });
}
