// import { connection } from "../db.js";
// import mongodb from "mongodb";
import admin from "firebase-admin";

const ORDER_STATUS_MESSAGE = [
  "Your order is being prepared",
  "Delivery man has picked up your order",
  "Your delivery man arrived",
];

export async function createOrder(userId, menus) {
  // let db = await connection.get();
  // const orders = db.collection("orders");
  // return orders.insertOne({
  //   user_id: userId,
  //   menus,
  //   total,
  //   date: new date(),
  // });
  for (let i = 0; i < ORDER_STATUS_MESSAGE.length; i++) {
    setTimeout(() => {
      admin
        .messaging()
        .send({
          notification: {
            body: ORDER_STATUS_MESSAGE[i],
          },
          topic: "order-" + userId,
        })
        .then((response) => {
          // Response is a message ID string.
          console.log("Successfully sent message:", response);
        })
        .catch((error) => {
          console.log("Error sending message:", error);
        });
    }, (i + 1) * 10000);
  }
}
