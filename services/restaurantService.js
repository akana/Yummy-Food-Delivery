import { connection } from "../db.js";
import mongodb from "mongodb";

export async function getRestaurants() {
  let db = await connection.get();
  const collection = db.collection("restaurants");
  const restaurantCursor = await collection
    .find({}, { projection: { menus: 0 } })
    .limit(20);
  let restaurants = await restaurantCursor.toArray();
  return restaurants;
}

export async function getMenusByRestaurant(id) {
  let db = await connection.get();
  const collection = db.collection("restaurants");
  const restaurantCursor = await collection
    .aggregate([
      {
        $match: { _id: mongodb.ObjectId(id) },
      },
      {
        $lookup: {
          from: "menu_items",
          localField: "menus",
          foreignField: "_id",
          as: "menus",
        },
      },
      {
        $project: { menus: 1 },
      },
    ])
    .limit(20);
  let restaurants = await restaurantCursor.toArray();
  if (restaurants.length == 0) {
    throw new Error(404);
  }
  return restaurants[0].menus;
}
